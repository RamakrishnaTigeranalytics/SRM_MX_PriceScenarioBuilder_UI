import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.services';

@Component({
  selector: 'app-signup-auth',
  templateUrl: './signup-auth.component.html',
  styleUrls: ['./signup-auth.component.scss']
})
export class SignupAuthComponent implements OnInit {

  constructor(public authService:AuthService,public router:Router) { }
  invalidLogin:any;
  errorMessage:string;
  ngOnInit(): void {
  }
  signUp(creds) {
    this.authService.signUp(creds).subscribe(
      (data) => {
        this.router.navigate(['']);
      },
      (error:HttpErrorResponse) => {
        this.invalidLogin = true;
        if(error.error.name != undefined){
          this.errorMessage =error.error.name[0];
        }else if (error.error.password != undefined){
          this.errorMessage =error.error.password[0];
        }else if(error.error.email != undefined){
          this.errorMessage = error.error.email[0];
        }


       
      }
    );
  }
}
