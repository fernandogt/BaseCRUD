import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {  } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent{
  loginForm: FormGroup = new FormGroup({});
  errorMessage = '';
  submitted = false;
  constructor( private router: Router, private authService: AuthService, private formBuilder: FormBuilder) { }
  
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {

  }

  login() {

    // Ir al backend
    // un usuario
    this.authService.login()
      .subscribe( resp => {
        console.log(resp);

        if ( resp.id ) {
          this.router.navigate(['./heroes']);
        }
      })
  }

  ingresarSinLogin() {
    this.authService.logout();
    this.router.navigate(['./heroes']);
  }

}
