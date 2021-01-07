import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/login/auth.guard';
import { ErrorComponent } from './pages/error/error.component';
const routes: Routes = [
  {
    path: '', component:HomeComponent,
  },
  {
    path: 'login', component:LoginComponent,
  },
  {
    path: 'dashboard', loadChildren: './pages/dashboard/dashboard.module#DashboardModule', canActivate: [AuthGuard]
  },
  {
    path: 'error', component:ErrorComponent,
  },
  {
    path: '**', component:ErrorComponent,
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule { }
