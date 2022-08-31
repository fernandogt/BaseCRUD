import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { SingletonService } from 'src/app/singleton.service';
import { JwtHelperService } from '@auth0/angular-jwt';


/**
 * Formulario de login.
 * Es el punto inicial en caso de no estar logeado.
 */
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    loginForm!: FormGroup;
    submitted = false;
    validLogin = true;
    
    constructor(private formBuilder: FormBuilder, private router: Router, private singletonService: SingletonService,) {
        
    }

    ngOnInit() {
        if (localStorage.getItem('currentUser')) {
            this.router.navigate(['inicio/l']);
        }
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }
    
    onSubmit() {
        this.submitted = true;

        if (this.loginForm.invalid) {
          console.log('NO VAL');
            return;
        }
        const FAKE_LOGIN = true;

        if (FAKE_LOGIN) {
              localStorage.setItem('tk', 'aaaaa');
              sessionStorage.setItem('u', this.loginForm.get('username')?.value);
              sessionStorage.setItem('p', this.loginForm.get('password')?.value);
              localStorage.setItem('tks', 'bbbbb');
              const jwt = new JwtHelperService();
              //console.log(jwt.decodeToken(res.toString())["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid"]);
              //console.log(jwt.decodeToken(res.toString()));
              this.router.navigate(['/home/m']);
        } else {
          this.singletonService.login2(this.loginForm.get('username')?.value, this.loginForm.get('password')?.value).subscribe(
            res => {
              console.log(res);
              localStorage.setItem('tk', (res as any).token1.toString());
              sessionStorage.setItem('u', this.loginForm.get('username')?.value);
              sessionStorage.setItem('p', this.loginForm.get('password')?.value);
              localStorage.setItem('tks', (res as any).token2.toString());
              const jwt = new JwtHelperService();
              //console.log(jwt.decodeToken(res.toString())["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid"]);
              //console.log(jwt.decodeToken(res.toString()));
              this.router.navigate(['/home/m']);
  
            },
            err => {
              console.log(err);
              this.validLogin = false;
            }
          );
        }
        
        
            /*this.singletonService.login(this.loginForm.controls.username.value, this.loginForm.controls.password.value).then(
                (success) => {
                    this.router.navigate(['/inicio/l']);
                }
            ).catch(
                (err) => {
                    console.log(err);
                    this.validLogin = false;
                }
            );*/

        this.singletonService.checkUser();
    }
}
