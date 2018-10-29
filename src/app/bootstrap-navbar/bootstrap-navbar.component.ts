import { AppUser } from './../models/app-user';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'bootstrap-navbar',
  templateUrl: './bootstrap-navbar.component.html',
  styleUrls: ['./bootstrap-navbar.component.css']
})
export class BootstrapNavbarComponent {
 appUser: AppUser;
  constructor(public auth: AuthService) {
   auth.appUser$.subscribe(appUser=>this.appUser=appUser);
  }
  ngOnInit() {
  }
  logout() {
    this.auth.logout();
  }
}
