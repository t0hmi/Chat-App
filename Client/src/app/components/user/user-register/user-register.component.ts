import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserActions } from 'src/app/store/user';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnInit {

  constructor(private store : Store, private router : Router) { }

  email = new FormControl('', [Validators.required, Validators.email])
  password = new FormControl('', [Validators.required])

  formGroup = new FormGroup({
    email : this.email,
    password :this.password
  })

  ngOnInit(): void {
  }

  registerUser() {
    this.formGroup.markAllAsTouched();
    if(this.formGroup.valid) {
      const {email, password} = this.formGroup.value;

      if(email && password) {
        this.store.dispatch(UserActions.register({email, password}));
      }
    }
  }

  // registerWithGithub() : void {
  //   const url = 'https://github.com/login/oauth/authorize?client_id=4e925949188f9c21c348'
  //   this.router.navigate(['/auth'], {queryParams: {url}})
  //   // this.store.dispatch(UserActions.login());
  // }

}
