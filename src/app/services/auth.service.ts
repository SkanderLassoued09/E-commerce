import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<firebase.default.User | null>
  userId: string = ''
  constructor(private afa: AngularFireAuth) {
    this.user = this.afa.user
  }

  signUp(email: any, password: any) {
    return this.afa.createUserWithEmailAndPassword(email, password)
  }

  signIn(email: any, password: any) {
    return this.afa.signInWithEmailAndPassword(email, password);
  }

  logOut() {
    return this.afa.signOut();

  }
}
