import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isUser: boolean = false

  constructor(private auth: AuthService) { }

  ngOnInit(): void {

    // => to check the error
    /*
     this.auth.user.subscribe(user => {
       if (user) {
         this.isUser = true
         this.auth.user = user.uid
         console.log(typeof (user.uid));
       } else {
         this.isUser = false
         this.auth.user = ''
       }
     })
     */

    //FIRST METHOD
    this.auth.user.subscribe(userData => {
      if (userData) {
        this.isUser = true
        this.auth.userId = userData.uid

      } else {
        this.isUser = false
        this.auth.userId = ''
      }
    })
  }

  logout() {
    this.auth.logOut().then(() => console.log('out'))
  }

}
