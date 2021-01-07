import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ApiServicesService } from '../../../api-services/api-services.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/login/auth.service';
 
@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  public categoryList:any;
  addCategoryForm: FormGroup;
  deleteCategoryForm: FormGroup;
  submitted = false;
  constructor(private apiServices: ApiServicesService, private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.addCategoryForm = this.createformgroup();
    this.deleteCategoryForm = this.createformgroup1();
   }

  ngOnInit() {
    this.apiServices.getCatagory().subscribe(res=>{
      this.categoryList=res.res;
    })
  }
  createformgroup(){  
    return new FormGroup({
      'category': new FormControl(null, {validators: [Validators.required,Validators.minLength(3)]})

    });
  }

  createformgroup1(){  
    return new FormGroup({
      'categoryDropdown': new FormControl(null, {validators: [Validators.required]})
    });
  }
  addCategory(){
    this.submitted = true;
    if (this.addCategoryForm.valid) {
      this.apiServices.addProjectCategory(this.addCategoryForm.value.category).subscribe(res=>{
      });
      this.clear();
    }
  }

  deleteCategory(){
    this.submitted = true;
    if (this.deleteCategoryForm.valid) {
      this.apiServices.deleteProjectCategory(this.deleteCategoryForm.value.categoryDropdown).subscribe(res=>{
      });
      this.clear();
    }
  }

  clear(){
    this.addCategoryForm.reset();
    this.deleteCategoryForm.reset();
  }
  onCategoryChange(e){
  }

  get categoryFormControl() {
    return this.addCategoryForm.controls;
  }
  get addDeleteControl() {
    return this.deleteCategoryForm.controls;
  }
  logOut(){
    this.authService.logOut();
  }
}
