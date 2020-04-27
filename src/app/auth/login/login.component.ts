import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { environment } from '../../../environments/environment';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  url;
  
  constructor(private httpservice: HttpService, public snackBar: MatSnackBar, private router: Router, private AuthService: AuthService) { 
    if (AuthService.isAuthenticated())
    this.router.navigateByUrl('invoice/create-invoice')
  }
  loginForm = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]),
    password: new FormControl('',Validators.required),
  });

  ngOnInit(): void {
    this.url = environment.api_endpoint;
  }

  authenticate() {
    let data = {
      user_email: this.loginForm.value.email,
      user_password: this.loginForm.value.password
    }
    this.httpservice.post(this.url+'auth_login',data).subscribe((res)=> {
      console.log("response",res);  
      this.snackBar.open(res.message, '', {
        duration: 2000,
      }); 
      sessionStorage.setItem('token', res.token)
      this.router.navigateByUrl('invoice/create-invoice')
    },
    (error)=>{
        console.log(error);
        this.snackBar.open(error.error?.message, '', {
          duration: 2000,
        }); 
    });
  }

}
