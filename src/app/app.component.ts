import { Component,ChangeDetectorRef, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import {SpinnerService} from "./shared/services/spinner.service"
import {
 delay
} from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  showSpinner: boolean;
  title = 'price-simulator';
  profit_pool = false;
  hide = false;
  route;
  sidebars = [
    '/pricepool/yc',
    '/pricepool',
    '/pricepool/yearly-trends',
    '/pricepool/summ',
  ];
  home = ['/', '/home'];

  constructor(private spinnerService: SpinnerService,private router: Router,private cd: ChangeDetectorRef) {
    if(window.location.search.substr(1).includes("=")){
      const token = window.location.search.substr(1).split('=')[1];
      var decToken = window.atob(token);
      localStorage.setItem('token',decToken)
  }
    // this.router.events.subscribe((val) => {
    //   if (val instanceof NavigationEnd) {
    //     // console.log(val, 'VAL OF ROUTER ');
    //     // console.log(val.url, 'VAL OF ROUTER ');
    //     if (this.sidebars.includes(val.url)) {
    //       // this.hideNav()
    //       this.profit_pool = true;
    //     } else {
    //       this.profit_pool = false;
    //     }
    //     if (this.home.includes(val.url)) {
    //       // this.hideNav()
    //       this.hide = true;
    //     } else {
    //       this.hide = false;
    //     }
    //   }
    // });

    this.spinnerService.getSpin().pipe(delay(0)).subscribe(data=>{
      this.showSpinner = data
    })
  }
  ngOnInit(): void {
    // if (!localStorage.getItem('reload')) { 
    //   localStorage.setItem('reload', 'no reload') 
    //   location.reload() 
    // } else {

    //   localStorage.removeItem('reload')
    //   this.router.navigateByUrl('')
    // }
  }


 
}
