import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { checkEmail } from 'src/app/shared/function/function';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  
  loginForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private httpClient: HttpClient
  ){}

  ngOnInit(): void {
    this.authService.isLoggedIn().then((data) => {
      if(data) {
        this.router.navigate(['employee']);
      }
    });

    this.loginForm = this.fb.group({
      email: ['', Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")],
      password: [''] 
    });
  }

  get loginFormControl() {
    return this.loginForm.controls;
  }

  onLogin(){
    if(this.loginForm.valid){
      this.authService.login(this.loginFormControl['email'].value, this.loginFormControl['password'].value).subscribe((data) => {
        if(data) {
          const URL = './../../../assets/employee.json';
          this.httpClient.get(URL).subscribe((data: any) => {
            let dataEmployee = data.map((data: any) => {
              return {
                ...data,
                concatString: data['username']+' '+data['firstName']+' '+data['lastName']+' '+data['email']
              }
            });

            localStorage.setItem('employeeData', JSON.stringify(dataEmployee));
            this.router.navigate(['employee']);
          });

        } else {
          alert("Login Error");
        }
      });
    } else {
      alert("Email dan Password tidak sesuai");
    }
  }
}
