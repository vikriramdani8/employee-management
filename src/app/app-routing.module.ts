import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeAddComponent } from './pages/employee-add/employee-add.component';
import { EmployeeDetailComponent } from './pages/employee-detail/employee-detail.component';
import { EmployeeComponent } from './pages/employee/employee.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './shared/services/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login' ,
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'employee',
    component: EmployeeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'employee/add',
    component: EmployeeAddComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'employee/:id',
    component: EmployeeDetailComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
