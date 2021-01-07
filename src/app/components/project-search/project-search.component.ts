import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {  } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiServicesService } from '../../api-services/api-services.service';
@Component({
  selector: 'app-project-search',
  templateUrl: './project-search.component.html',
  styleUrls: ['./project-search.component.scss']
})
export class ProjectSearchComponent implements OnInit {
  // public categoryList: Catagory[]=[];
  public categoryList: any;
  public categoryNumber=0;
  public searchValue=null;
  isLoading=true;
  toggleStatus=false;
  form = new FormGroup({
    category: new FormControl('', Validators.required)
  });
  toggleForm = new FormGroup({
    toggleStatus: new FormControl('')
  });

  public projectList: any;
  @Output() searchedRecord = new EventEmitter();
  searchForm: FormGroup;
  submitted = false;
  constructor( private fb: FormBuilder, private router: Router, private apiServices: ApiServicesService) { }

  ngOnInit() {
    this.searchForm = this.fb.group({
      search: ['', [Validators.required]]
    });
    this.apiServices.getCatagory().subscribe(res=>{
      this.categoryList=res.res;
    });
  }

  get f(){
    return this.form.controls;
  }
  get tf(){
    return this.toggleForm.controls;
  }
  
  
  changeCategory(e) {
    console.log(e.target.value);
    console.log(this.searchValue);
    this.categoryNumber=e.target.value;
    this.apiServices.search(this.searchValue,this.categoryNumber,this.toggleStatus).subscribe(
      res=>{
        console.log(res.res);
        this.isLoading=false;
        this.searchedRecord.emit(res.res);
      }
    )
  }
  toggle(){
    if(this.toggleStatus){
      this.toggleStatus=false;
      this.apiServices.search(this.searchValue,this.categoryNumber,this.toggleStatus).subscribe(
      res=>{
        console.log(res.res);
        this.isLoading=false;
        this.searchedRecord.emit(res.res);
      }
    )
    }else{
      this.toggleStatus=true;
    this.apiServices.search(this.searchValue,this.categoryNumber,this.toggleStatus).subscribe(
      res=>{
        console.log(res.res);
        this.searchedRecord.emit(res.res);
        this.isLoading=false;
      }
    )
    }
    console.log("this is my togle value = "+this.toggleStatus);
  }
  keypress(e){
    this.searchValue=e;
    if(e.length>=3){
      this.apiServices.search(e,this.categoryNumber,this.toggleStatus).subscribe(
        res=>{
          console.log(res.res);
          this.isLoading=false;
          this.searchedRecord.emit(res.res);
        }
      )
    }else{
      this.apiServices.getSearchedProject().subscribe(res=>{
        this.projectList=res.res;
        this.isLoading=false;
        this.searchedRecord.emit(res.res);
      });
    }
  }

}
