import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
@Component({
  selector: 'bootstrap-navbar',
  templateUrl: './bootstrap-navbar.component.html',
  styleUrls: ['./bootstrap-navbar.component.css']
})
export class BootstrapNavbarComponent {
  user$: Observable<firebase.User>;
  constructor(
    private afauth: AngularFireAuth
  ) {
    this.user$ = afauth.authState;
  }
  ngOnInit() {
  }
  logout() {
    this.afauth.auth.signOut();
  }
}
