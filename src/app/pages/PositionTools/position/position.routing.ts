import { Routes } from '@angular/router';
import {PositionCreationComponent} from "../position-creation/position-creation.component";
import {PositionUpdateComponent} from "../position-update/position-update.component";
import {PositionSearchComponent} from "../position-search/position-search.component";
import {PositionMenuComponent} from "../position-menu/position-menu.component";
import {PositionListComponent} from "../position-list/position-list.component";



export const PositionLayoutsRoutes: Routes = [
  { path: 'position-creation',      component: PositionCreationComponent  },
  { path: 'position-update',      component: PositionUpdateComponent },
  { path: 'position-search',      component: PositionSearchComponent },
  {path: 'position-menu',      component: PositionMenuComponent },
  {path: 'position-list',      component: PositionListComponent }


];
