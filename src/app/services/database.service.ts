import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private afs: AngularFirestore, private storage: AngularFireStorage) {

  }
  //
  getAllProducts() {
    /*
    AngularFirestore is database module of firebase contain methods to access to it

    1/ inject service called 'AngularFirestore' and keep digging inside it door by door to get what you want

    2/ difference between [valueChanges] and [snapshotchanges]

    => valueChanges gets directly the data : return array of objects
    -> collection -> doc -> objects -> {name: X,age:Y}
    return [{},{},{},{}] directly

    => snapshotchanges return an array of object too but inside these object not the values as values changes
    these object contain other things can lead us to many tools like things lead us to get an id , others to get the values etc
    */
    return this.afs.collection('products').snapshotChanges();
  }
  addNewProduct(name: string, price: number, uploadPhoto: File) {
    let ref = this.storage.ref('productsFolder/' + uploadPhoto.name)
    ref.put(uploadPhoto).then((data) => {
      ref.getDownloadURL().subscribe((photoUrl) => {
        this.afs.collection('products').add({ name, price, photoUrl })
        console.log(data.state);
      })
    })

  }
}
