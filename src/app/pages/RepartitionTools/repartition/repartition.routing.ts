import { Routes } from '@angular/router';
import {RepartitionCreationComponent} from "../repartition-creation/repartition-creation.component";
import {RepartitionUpdateComponent} from "../repartition-update/repartition-update.component";
import {RepartitionListComponent} from "../repartition-list/repartition-list.component";
import {RepartitionMenuComponent} from "../repartition-menu/repartition-menu.component";
import {RepartitionSearchComponent} from "../repartition-search/repartition-search.component";





export const RepartitionLayoutsRoutes: Routes = [
  { path: 'repartition-creation',      component: RepartitionCreationComponent  },
  { path: 'repartition-update',      component:  RepartitionUpdateComponent },
  { path: 'repartition-list',      component:  RepartitionListComponent },
  {path: 'repartition-menu',      component:  RepartitionMenuComponent },
  {path: 'repartition-search',      component:  RepartitionSearchComponent },



];
