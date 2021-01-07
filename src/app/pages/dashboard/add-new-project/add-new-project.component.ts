import { Component, OnInit } from '@angular/core';
import {FormControl, Validators,FormBuilder, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/login/auth.service';
import { ApiServicesService } from '../../../api-services/api-services.service';
import { mimeType } from './mime-type.validator';
import Swal from 'sweetalert2/dist/sweetalert2.js';


@Component({
  selector: 'app-add-new-project',
  templateUrl: './add-new-project.component.html',
  styleUrls: ['./add-new-project.component.scss']
})
export class AddNewProjectComponent implements OnInit {
  imagePreview: string;
  public categoryList:any;
  addProject: FormGroup;
  submitted = false;
  constructor(private apiservices: ApiServicesService,private fb: FormBuilder,private router : Router, private authService: AuthService) { }

  ngOnInit() {
    this.addProject = this.createformgroup();
    this.apiservices.getCatagory().subscribe(res=>{
      this.categoryList=res.res;
    });
    this.clear(); 
  }
  addProjectData(){
    this.submitted = true;
    if (this.addProject.valid) {
      this.apiservices.addProject(this.addProject.value.title, this.addProject.value.categoryDropdown, this.addProject.value.description,this.addProject.value.status,this.addProject.value.image).subscribe(res=>{
      if(res.status===true){
        Swal.fire(
          'Added!',
          'Your project file has been added.',
          'success'
        )
      }
      });
    }
    this.clear(); 
  }
  createformgroup(){  
    return new FormGroup({
      'title': new FormControl(null, {validators: [Validators.required,Validators.minLength(3)]}),
      'description': new FormControl(null, {validators: [Validators.required, Validators.minLength(10)]}),
      'categoryDropdown': new FormControl(null, {validators: [Validators.required]}),
      'status': new FormControl(null, {validators: [Validators.required]}),
      'image': new FormControl(null, {validators: [Validators.required], asyncValidators: [mimeType]}),
  });
}
onImagePicked(event: Event){
  const file = (event.target as HTMLInputElement).files[0];
  this.addProject.patchValue({image: file});
  this.addProject.get('image').updateValueAndValidity();
  const reader = new FileReader();
  reader.onload = () => {
    this.imagePreview = <string>reader.result;
  }
  reader.readAsDataURL(file);
}

get addFormControl() {
  return this.addProject.controls;
}
clear(){
  this.submitted=false;
   this.imagePreview= null;
   this.addProject.reset();
}
logOut(){
  this.authService.logOut();
}
}
