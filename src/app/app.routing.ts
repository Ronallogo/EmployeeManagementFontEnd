import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import {PositionLayoutsRoutes} from "./pages/PositionTools/position/position.routing";
import {EmployeeLayoutsRoutes} from "./pages/EmployeeTools/employee/employee.routing";
import {TaskLayoutsRoutes} from "./pages/TaskTools/task/task.routing";
import {ContenuLayoutsRoutes} from "./pages/contenuTools/contenu/contenu.routing";
import {CongeLayoutsRoutes} from "./pages/congetools/conge/conge.routing";
import {AbsenceLayoutsRoutes} from "./pages/absenceTools/absence/absence.routing";
import {PayStubLayoutsRoutes} from "./pages/payStubTools/pay-stub/payStub.routing";
import {LoginComponent} from "./pages/login/login.component";
import {TaskScheduledLayoutsRoutes} from "./pages/TaskTools/taskScheduledTools/task-scheduled/taskScheduled.routing";
import {RepartitionLayoutsRoutes} from "./pages/RepartitionTools/repartition/repartition.routing";
import {MessageLayoutsRoutes} from "./pages/messagerie/serviceMessage/messageRouting";





export const AppRoutes: Routes = [

  {
    path: '',
    redirectTo:'login'  ,
    pathMatch: 'full',
  }, {
    path: '',
    component: AdminLayoutComponent,
    children: [
      ...EmployeeLayoutsRoutes ,
      ...PositionLayoutsRoutes ,
      ...TaskLayoutsRoutes ,
      ...ContenuLayoutsRoutes ,
      ...CongeLayoutsRoutes ,
      ...AbsenceLayoutsRoutes ,
      ...PayStubLayoutsRoutes ,
      ...TaskScheduledLayoutsRoutes,
      ...RepartitionLayoutsRoutes ,
      ...MessageLayoutsRoutes,
      {
      path: '',
      loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(x => x.AdminLayoutModule)
  }] ,


},
  { path: 'login',      component:  LoginComponent }





]
