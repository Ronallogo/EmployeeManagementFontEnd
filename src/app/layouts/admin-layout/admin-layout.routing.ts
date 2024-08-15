import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
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

export const AdminLayoutRoutes: Routes = [

  { path: 'dashboard',      component: DashboardComponent },
    { path: 'employee',      component: EmployeeComponent },
    { path: 'position',      component: PositionComponent },
    { path: 'task',      component: TaskComponent },
    { path: 'contenu',      component: ContenuComponent },
    { path: 'user',           component: UserComponent },
    { path: 'table',          component: TableComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent }
];
