import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth.service';
import { UserActions } from 'src/app/store/user';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {

  constructor(private store : Store, private router : Router) { }

  email = new FormControl('', [Validators.required, Validators.email])
  password = new FormControl('', [Validators.required])

  formGroup = new FormGroup({
    email : this.email,
    password :this.password
  })

  ngOnInit(): void {
  }

  loginUser() {
    this.formGroup.markAllAsTouched();
    if(!this.formGroup.valid) return;

    const {email, password} = this.formGroup.value;

    if(email && password) {
      this.store.dispatch(UserActions.login({email, password }))
    }
  }

}
