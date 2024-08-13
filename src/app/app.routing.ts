import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import {PositionLayoutsRoutes} from "./pages/PositionTools/position/position.routing";
import {EmployeeLayoutsRoutes} from "./pages/EmployeeTools/employee/employee.routing";

export const AppRoutes: Routes = [

  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }, {
    path: '',
    component: AdminLayoutComponent,
    children: [
      ...EmployeeLayoutsRoutes ,
      ...PositionLayoutsRoutes ,
        {
      path: '',
      loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(x => x.AdminLayoutModule)
  }]}





]
