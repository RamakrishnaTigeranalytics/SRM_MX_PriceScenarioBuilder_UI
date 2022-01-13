import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {User} from "../shared/models/user.model"
import {AuthService} from "../shared/services/auth.services"

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user : any
token :any;
userStorage:any ;
  constructor(private auth : AuthService) { 
   //this.userStorage = localStorage.getItem('token');
  }

  ngOnInit(){
   this.token = localStorage.getItem('token');
  this.auth.getUser().subscribe((data:User)=>{
    // this.user = data.name || data.email
    // console.log("checking", this.user);
})
// const iframe = document.createElement('IFRAME');
//     iframe.id = 'admin-ifr';
//     iframe.style.display = "none";
//     (<HTMLIFrameElement>iframe).src = "http://localhost:51934";
//     document.body.appendChild(iframe);
//     this.postAdminData("http://localhost:51934");

  }
  // postAdminData(linkURL) {
     
  //   this.postCrossDomainMessage(linkURL);
  // }
  logout(){
    this.auth.logout()
  }
//   postCrossDomainMessage(link) {
//     let postURL: any;
//     let iframeId: any;

//     const iframe = document.getElementById(iframeId);
//     console.log(iframe);
//     if (iframe == null) { return; }
//     const iWindow = (iframe as HTMLIFrameElement).contentWindow;
//     const storageData = this.userStorage;
   
//     // setTimeout(function () {
     
//     //     iWindow.postMessage(storageData, "http://localhost:51934");
//     // }, 1000);
// }
}
