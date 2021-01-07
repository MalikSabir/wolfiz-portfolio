import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/login/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public firstName='null';
  public image='null';
  public user:any;
  constructor(private authService: AuthService) { }
  togleOn:boolean=true;
  ngOnInit() {
    this.user=JSON.parse(localStorage.getItem("response"));
    this.firstName=this.user.firstName;
    this.image=this.user.image;
  }
  logOut(){
    this.authService.logOut();
  }
}
