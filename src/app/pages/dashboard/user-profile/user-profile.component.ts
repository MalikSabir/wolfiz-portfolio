import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/login/auth.service'
import { ApiServicesService } from '../../../api-services/api-services.service';
import {FormControl, Validators,FormBuilder, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
public firstName='null';
public lastName='null';
public email='null';
public userId='null';
public image=null;
public imageProfile=null;
public user:any;
status=true;
passStatus=true;

changePasswordForm:FormGroup;
  constructor(private authService: AuthService, private apiService: ApiServicesService, private fb: FormBuilder,private router : Router) { }

  ngOnInit() {
    this.changePasswordForm = this.createformgroup();
    this.user=JSON.parse(localStorage.getItem("response"));
    this.firstName=this.user.firstName;
    this.lastName=this.user.lastName;
    this.email=this.user.email;
    this.userId=this.user.userId;
    this.image=this.user.image;
    this.imageProfile=this.user.image;
  }

  createformgroup(){  
    return new FormGroup({
      'currentPassowrd': new FormControl(null, {validators: [Validators.required,Validators.minLength(3)]}),
      'newPassword': new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
      'verifyPassword': new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
  });
}
get addFormControl() {
  return this.changePasswordForm.controls;
}
  personalInfo(){
    this.status=true;
  }
  changePass(){
    this.status=false;
  }
  logOut(){
    this.authService.logOut();
  }
  changePassword(userId: string){
    if(this.changePasswordForm.value.newPassword===this.changePasswordForm.value.verifyPassword)
    {
      if (this.changePasswordForm.valid) {
        this.apiService.changePassword(userId, this.changePasswordForm.value.newPassword,this.changePasswordForm.value.currentPassowrd).subscribe(res=>{
          console.log("password has been changed"+res.res);
        });
      }
    }
    else{
      this.passStatus=true;
      console.log("pass not match");
    }
  }
  
  cancelImage(){
    this.image='./assets/media/users/blank.png';
  }

clear(){
  this.changePasswordForm.reset();
  this.passStatus=true;
}

}
