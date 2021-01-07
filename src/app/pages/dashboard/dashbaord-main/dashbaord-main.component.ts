import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/login/auth.service';
import { ApiServicesService } from '../../../api-services/api-services.service';

@Component({
  selector: 'app-dashbaord-main',
  templateUrl: './dashbaord-main.component.html',
  styleUrls: ['./dashbaord-main.component.scss']
})
export class DashbaordMainComponent implements OnInit {
  androidTotal=0;
  graphicTotal=0;
  webTotal=0;
  total=0;
  public topProjectList:any;
  constructor(private apiServices:ApiServicesService, private authService: AuthService) { }

  ngOnInit() {
    this.apiServices.getCountAndroid().subscribe(res=>{
      this.androidTotal=res.res[0].count;
    });

    this.apiServices.getCountGraphic().subscribe(res=>{
      this.graphicTotal=res.res[0].count;
    });

    this.apiServices.getCountWeb().subscribe(res=>{
      this.webTotal=res.res[0].count;
    });

    this.apiServices.getListTopProject().subscribe(res=>{
      this.topProjectList=res.res;
      this.total=this.webTotal+this.graphicTotal+this.androidTotal;
    });
  }

}
