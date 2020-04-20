import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class AppHeaderComponent {
  constructor(private router: Router) {

  }
  sign_out() {
    sessionStorage.setItem('token',null)
    this.router.navigateByUrl('login')
  }
}
