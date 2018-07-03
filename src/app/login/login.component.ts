import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  error: string;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  get f () {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    var username = this.f.username.value;
    var password = this.f.password.value;
    this.authUser(username, password);
  }

  authUser(username: string, password: string) {
    this.userService.authUser(username, password)
      .subscribe( 
        data => {
          console.log("data: " + data)
        }, error => {
          this.error = error.error.message;
        });
  }

}
