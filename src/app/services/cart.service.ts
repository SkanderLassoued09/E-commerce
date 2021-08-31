import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { products } from '../Interfaces/Products.interface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private afs: AngularFirestore, private auth: AuthService) { }

  addToCart(data: products) {
    // Fact any method of type promise use return
    return this.afs.collection(`users/${this.auth.userId}/cart`).add(data)
  }
  getToCart() {
    // Get selected data by id
    return this.afs.collection(`users/${this.auth.userId}/cart`).snapshotChanges()
  }
  delete(id: string) {
    this.afs.doc(`users/${this.auth.userId}/cart/${id}`).delete()
  }
}
