import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashbaoard.component';
import { ProjectsComponent } from './projects/projects.component';
import { AddNewProjectComponent } from './add-new-project/add-new-project.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { DashbaordMainComponent } from './dashbaord-main/dashbaord-main.component';


const routes: Routes = [
  // {
  //   path: '', redirectTo:"dashboard", pathMatch:"full"
  // },
  {
    path: '', component:DashboardComponent,
    children:[
      {
        path: '', component:DashbaordMainComponent,
      },
      {
        path: 'projects', component:ProjectsComponent,
      },
      {
        path:'add-new-projects',component: AddNewProjectComponent,
      },
      {
        path: 'add-category', component:AddCategoryComponent, 
      },
      {
        path: 'user-profile', component:UserProfileComponent,
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
