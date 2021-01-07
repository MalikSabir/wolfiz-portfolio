import { Component, OnInit } from '@angular/core';
import { ApiServicesService} from '../../api-services/api-services.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  projectList: any;
  constructor(private apiServices: ApiServicesService) { }

  ngOnInit() {
    console.log(this.projectList);
    this.apiServices.getSearchedProject().subscribe(res=>{
      this.projectList=res.res;
      console.log(res.res);
    });

  }

  View(projectId: string){
    localStorage.setItem("projectId",projectId);
  }

  getSearchedData(data: any){
    this.projectList=data;
  }

}
