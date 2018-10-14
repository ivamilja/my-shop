import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bootstrap-navbar',
  templateUrl: './bootstrap-navbar.component.html',
  styleUrls: ['./bootstrap-navbar.component.css']
})
export class BootstrapNavbarComponent {

  constructor(
    private afauth: AngularFireAuth
  ) {}

  ngOnInit() {
  }
  logout() {
    this.afauth.auth.signOut();
  }
}
