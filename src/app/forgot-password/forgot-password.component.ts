import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.services';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  invalidLogin =false;
  message:string;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }
public forgot(mailId){
  this.authService.forgotPassword(mailId).subscribe((data:any)=>{
    const {code,message,token} = data;
    if(code !=200){
      this.invalidLogin = true;
      this.message = message;
    }else{
      localStorage.setItem("token",token);
      this.router.navigate(['resetpassword']);
    }
  })
}
}
