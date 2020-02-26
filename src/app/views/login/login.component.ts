import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loggedIn: boolean;

  usernameControl = new FormControl();
  passwordControl = new FormControl();

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.loggedIn = this.auth.isAuthenticated();
    this.auth.authenticatedStatus.subscribe(v => {
      this.loggedIn = this.auth.isAuthenticated();
    });
  }

  doLogin() {
    this.auth.login(this.usernameControl.value, this.passwordControl.value);
  }

  doLogout() {
    this.auth.logout();
  }

}
