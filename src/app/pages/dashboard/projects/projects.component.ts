import { Component, OnInit } from '@angular/core';
import { ApiServicesService } from '../../../api-services/api-services.service';
import { AuthService } from '../../../auth/login/auth.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  public allProjects:any;
  isLoading=true;
  imgPath=null;
  constructor(private apiServices: ApiServicesService, private authService: AuthService) { }

  ngOnInit() {
    this.apiServices.getListProjects().subscribe(res=>{
      this.allProjects=res.res;
      this.isLoading=false;
    })
  }
  logOut(){
    this.authService.logOut();
  }

  deleteProject(value,img){
    this.imgPath = img.split('/');
    this.apiServices.deleteProject(value, this.imgPath[4]).
    subscribe(res=>{
      console.log("Its my after delection response"+res.res);
      console.log("Its my after delection response"+res.status);
    });
  }

  confirmBox(value,img){
    this.imgPath = img.split('/');
    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'You will not be able to recover this file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.apiServices.deleteProject(value, this.imgPath[4]).
        subscribe(res=>{
          console.log(res.status);
          if(res.status==true){
            Swal.fire(
              'Deleted!',
              'Your project file has been deleted.',
              'success'
            )
          }
        });

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your project file is safe :)',
          'error'
        )
      }
    })
  }



}
