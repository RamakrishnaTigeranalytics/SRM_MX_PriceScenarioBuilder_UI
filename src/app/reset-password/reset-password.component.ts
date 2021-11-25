import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.services';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  invalidLogin =false;
  message:string;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }
public resetPassword(cred){
  if(cred.NewPassword !== cred.ConformPassword){
    this.invalidLogin = true;
    this.message="Password does't match";
  }else{
    this.authService.resetPass(cred).subscribe((data)=>{
    this.router.navigate(['/home']);
  })
  }

}
}
