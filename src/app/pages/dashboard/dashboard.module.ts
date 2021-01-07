import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashbaoard.component';
import { ProjectsComponent } from './projects/projects.component';
import { AddNewProjectComponent } from './add-new-project/add-new-project.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { DashbaordMainComponent } from './dashbaord-main/dashbaord-main.component';

import {ConfirmationPopoverModule} from 'angular-confirmation-popover';
// importing other modeule here...

@NgModule({
  declarations: [DashboardComponent, ProjectsComponent, AddNewProjectComponent, AddCategoryComponent, UserProfileComponent, DashbaordMainComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger'
    }),   
  ]
})
export class DashboardModule { }
