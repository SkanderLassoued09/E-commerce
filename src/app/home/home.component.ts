
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { products } from '../Interfaces/Products.interface';
import { CartService } from '../services/cart.service';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  // Store products in array called {prod} initialized
  prod: products[] = [];

  // {prod$} is an observable
  prod$: Subscription | undefined

  // {add} is an index to use it later in [cart]
  add: number = -1

  constructor(private getProds: DatabaseService, private cart: CartService) { }


  ngOnInit(): void {
    // Fetch data from firebase using a service called getProds
    this.prod$ = this.getProds.getAllProducts().subscribe(data => {

      /*Affect data to out array and get only the value with help 'Map' method
      cuz the data contain key value pair and all I need is the value to put in it inside {prod}*/
      this.prod = data.map(element => {

        return {
          /* the line below  id as key and element that contain the value in the firebase
          payload is a copy of our collection and all that assign or it's value of the id */
          id: element.payload.doc.id,
          /* we spread the data to access direct to data  */
          // VERY IMPORTANT: you should define the type of spread data as shown below
          ...element.payload.doc.data() as products
        }

      })
    })

  }
  // this method add the selected prod by index 'i' is the index selected
  addToCart(i: number) {
    this.add = +i
  }

  /* 'amount' the quantity of the prod selected it's an input comes from the view side (given by user)
  {selectedProds} is a local variable will contain the selected product
  {data} is a local object will be send to to cart component  */
  buy(amount: any) {
    let selectedProds = this.prod[this.add]
    let data = {
      name: selectedProds.name,
      price: selectedProds.price,
      amount: +amount
    }
    this.cart.addToCart(data).then(() => this.add = -1)
      .catch(err => console.log(err))
    console.log('You bought a product');

  }
  /* Here we talk lately about {prod$} it's better to close the subscription to win data memory
   */
  ngOnDestroy(): void {
    this.prod$?.unsubscribe()
  }

}
