import { Routes } from '@angular/router';
import {AbsenceCreationComponent} from "../absence-creation/absence-creation.component";
import {AbsenceUpdateComponent} from "../absence-update/absence-update.component";
import {AbsenceSearchComponent} from "../absence-search/absence-search.component";
import {AbsenceMenuComponent} from "../absence-menu/absence-menu.component";
import {AbsenceListComponent} from "../absence-list/absence-list.component";





export const AbsenceLayoutsRoutes: Routes = [
  { path: 'absence-creation',      component:   AbsenceCreationComponent  },
  { path: 'absence-update',      component: AbsenceUpdateComponent },
  { path: 'absence-search',      component: AbsenceSearchComponent },
  {path: 'absence-menu',      component:AbsenceMenuComponent },
  {path: 'absence-list',      component: AbsenceListComponent }


];
