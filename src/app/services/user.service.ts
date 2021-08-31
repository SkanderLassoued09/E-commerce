import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private afs: AngularFirestore) { }
  addUser(id: any, name: any, email: any) {
    /*
    Create a doc called user contain ID, NAME, EMAIL
    */
    return this.afs.doc('users/' + id).set(
      {
        name,
        email
      })


  }
}
