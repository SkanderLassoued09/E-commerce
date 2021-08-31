import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild('uploadPhoto', { read: ElementRef }) uploadPhoto!: ElementRef<HTMLInputElement>
  /*
  The meta data comes after the selector in the decorator
  as an object {static:true} -> when you want display data in ngOnInit
  {read:ElementRef} -> you tell what type should be returned from the element with the #myName template variable.
  */

  constructor(private database: DatabaseService) {
  }

  ngOnInit(): void {

  }
  AddNewProduct(data: NgForm) {
    let formData = (data.value)
    let name = formData.newProduct
    let price = formData.priceProduct
    let photo = this.uploadPhoto.nativeElement.files?.item(0)
    this.database.addNewProduct(name, price, photo as File)

    /*
    I DID IT  */

  }


}
