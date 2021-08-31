import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../Interfaces/User.interface';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private auth: AuthService, private route: Router) { }

  ngOnInit(): void {
  }
  login(form: any) {
    let data: User = form.value
    this.auth.signIn(data.email, data.password).then(() => this.route.navigate(['/']))
      .catch(err => console.log(err))
    console.log('You are logged in successfully');
  }


}
