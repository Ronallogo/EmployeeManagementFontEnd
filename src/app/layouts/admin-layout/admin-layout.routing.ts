import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/userSide/user/user.component';
import { TableComponent } from '../../pages/table/table.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { UpgradeComponent } from '../../pages/upgrade/upgrade.component';
import {EmployeeComponent} from "../../pages/EmployeeTools/employee/employee.component";
import {PositionComponent} from "../../pages/PositionTools/position/position.component";
import {PositionLayoutsRoutes} from "../../pages/PositionTools/position/position.routing";
import {TaskComponent} from "../../pages/TaskTools/task/task.component";
import {ContenuComponent} from "../../pages/contenuTools/contenu/contenu.component";
import {CongeComponent} from "../../pages/congetools/conge/conge.component";
import {AbsenceComponent} from "../../pages/absenceTools/absence/absence.component";
import {PayStubComponent} from "../../pages/payStubTools/pay-stub/pay-stub.component";
import {LogoutComponent} from "../../pages/logout/logout.component";
import {LoginComponent} from "../../pages/login/login.component";
import {UserProfilComponent} from "../../pages/user-part/userProfilTools/user-profil/user-profil.component";
import {UserTaskComponent} from "../../pages/user-part/usertaskTools/user-task/user-task.component";

export const AdminLayoutRoutes: Routes = [

  { path: 'dashboard',      component: DashboardComponent },
  { path: 'user-profil',      component: UserProfilComponent },
  { path: 'employee',      component: EmployeeComponent },
  { path: 'position',      component: PositionComponent },
  { path: 'task',      component: TaskComponent },
  { path: 'user-task',      component: UserTaskComponent },
  { path: 'contenu',      component: ContenuComponent },
  { path: 'conge',      component:  CongeComponent },
  { path: 'absence',      component:  AbsenceComponent },
  { path: 'payement',      component:  PayStubComponent },
  { path: 'logout',      component:  LogoutComponent },
  { path: 'user',           component: UserComponent },
  { path: 'table',          component: TableComponent },
  { path: 'icons',          component: IconsComponent },
  { path: 'maps',           component: MapsComponent },
  { path: 'notifications',  component: NotificationsComponent },
  { path: 'upgrade',        component: UpgradeComponent }
];
