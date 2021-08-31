import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../Interfaces/User.interface';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


  constructor(private auth: AuthService, private user: UserService, private route: Router) { }

  ngOnInit(): void {
  }
  addUser(data: any) {
    let dataInfo: User = data.value;

    this.auth.signUp(dataInfo.email, dataInfo.password)
      .then(data => {
        this.user.addUser(data.user?.uid, dataInfo.firstName, dataInfo.email).then(() => this.route.navigate(['/signIn']))
      }).catch(error => console.log(error))

      .catch(err => console.log('Error is', err))


    console.log('Account Added successfully');
  }
}
