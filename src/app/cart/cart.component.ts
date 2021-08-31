import { Component, OnInit } from '@angular/core';
import { Shopped } from '../Interfaces/bought.interface';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartProds: Shopped[] = []

  constructor(private cart: CartService) { }

  ngOnInit(): void {
    this.cart.getToCart().subscribe(cart => {
      this.cartProds = cart.map(element => {
        return {
          id: element.payload.doc.id,
          ...element.payload.doc.data() as Shopped
        }
      })
      console.log(this.cartProds);
    })
  }

  delete(index: number) {
    this.cart.delete(this.cartProds[index].id as string)
    console.log('Deleted');
  }

}
