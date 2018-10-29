import { UserService } from './user.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AppUser } from './models/app-user';
import { map, switchMap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>;
  constructor(
    private afauth: AngularFireAuth,
    private route: ActivatedRoute,
    private userService: UserService
    ) { 
    this.user$ = afauth.authState;
  }

  login(){
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.afauth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }
  logout(){
    this.afauth.auth.signOut();
  }
  get appUser$(): Observable<AppUser>{
    return  this.user$.pipe(
      switchMap(user => {
       if(user) return this.userService.get(user.uid).valueChanges()
       return of(null);
      }))
  }
}
