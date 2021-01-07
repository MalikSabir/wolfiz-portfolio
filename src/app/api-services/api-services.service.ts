import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router'
@Injectable({
  providedIn: 'root'
})
export class ApiServicesService {
  public host=window.location.hostname;
  public port = window.location.port;
  constructor(private http :HttpClient, private router : Router) { }

// back api path declering
private _signup = "http://"+this.host+":3000/api/signup";
private _getCountAndroid = "http://"+this.host+":3000/api/getCountAndroid";
private _getCatagory = "http://"+this.host+":3000/api/getCatagory";
private _getCountWeb = "http://"+this.host+":3000/api/getCountWeb";
private _getCountGraphic = "http://"+this.host+":3000/api/getCountGraphic";
private _getListProjects = "http://"+this.host+":3000/api/getListProjects";
private _getTopProject = "http://"+this.host+":3000/api/getTopProject";
private _addProject = "http://"+this.host+":3000/api/addProject";
private _getSearchedProject = "http://"+this.host+":3000/api/getSearchedProject";
private _search = "http://"+this.host+":3000/api/search";
private _viewProject = "http://"+this.host+":3000/api/viewProject";
private _addProjectCategry = "http://"+this.host+":3000/api/addProjectCategry";
private _deleteProjectCategry = "http://"+this.host+":3000/api/deleteProjectCategry";
private _deleteProject = "http://"+this.host+":3000/api/deleteProject";
private _getUser = "http://"+this.host+":3000/api/getUser";
private _changePassword = "http://"+this.host+":3000/api/changePassword";

/// Back api calling
signup(firstName: string, lastName: string, email: string, password: string){
  return this.http.post<any>(this._signup,{firstName, lastName, email, password})} 
getCountAndroid(){
    return this.http.get<any>(this._getCountAndroid)
  }
  getCountWeb(){
    return this.http.get<any>(this._getCountWeb)
  }
getCatagory(){
  return this.http.get<any>(this._getCatagory)
}
getCountGraphic(){
  return this.http.get<any>(this._getCountGraphic)
}
getListTopProject(){
  return this.http.get<any>(this._getTopProject)
}
getListProjects(){
  return this.http.get<any>(this._getListProjects)
}

addProject(title: string,categoryPk: string, description: string, status: string, image: File){
  const addProjectData = new FormData;
  addProjectData.append('title', title);
  addProjectData.append('categoryPk', categoryPk);
  addProjectData.append('description', description);
  addProjectData.append('status', status);
  addProjectData.append('image', image, title);
  return this.http.post<any>(this._addProject,addProjectData);
}

getSearchedProject(){
  return this.http.get<any>(this._getSearchedProject);
}
search(search: string, categoryNumber: number, toggleStatus: boolean){
  return this.http.post<any>(this._search,{search,categoryNumber,toggleStatus});
}
viewProject(projectId: string){
  console.log(projectId);
  return this.http.post<any>(this._viewProject,{projectId});
}
addProjectCategory(category: string){
  return this.http.post<any>(this._addProjectCategry,{category});
}
deleteProjectCategory(categoryName: string){
  return this.http.post<any>(this._deleteProjectCategry,{categoryName});
}
deleteProject(val: string, imgPath: string){
  return this.http.post<any>(this._deleteProject,{val, imgPath});
}
getUser(userId: string){
  return this.http.post<any>(this._getUser,{userId});
}
changePassword(userId: string, newPassword: string, currentPassowrd: string){
  return this.http.post<any>(this._changePassword,{userId, newPassword, currentPassowrd});
}

}
