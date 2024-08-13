import { Routes } from '@angular/router';
import {EmployeeSearchComponent} from "../employee-search/employee-search.component";
import {EmployeeListComponent} from "../employee-list/employee-list.component";
import {EmployeeMenuComponent} from "../employee-menu/employee-menu.component";
import {EmployeeUpdateComponent} from "../employee-update/employee-update.component";
import {EmployeeCreationComponent} from "../employee-creation/employee-creation.component";




export const EmployeeLayoutsRoutes: Routes = [
  { path: 'employee-creation',      component: EmployeeCreationComponent  },
  { path: 'employee-update',      component: EmployeeUpdateComponent },
  { path: 'employee-search',      component: EmployeeSearchComponent },
  {path: 'employee-menu',      component: EmployeeMenuComponent },
  {path: 'employee-list',      component: EmployeeListComponent },
  {path: 'employee-search',      component: EmployeeSearchComponent },


];
