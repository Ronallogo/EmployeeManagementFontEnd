import { Routes } from '@angular/router';
import {CongeListComponent} from "../conge-list/conge-list.component";
import {CongeMenuComponent} from "../conge-menu/conge-menu.component";
import {CongeUpdateComponent} from "../conge-update/conge-update.component";
import {CongeCreationComponent} from "../conge-creation/conge-creation.component";
import {SearchCongeComponent} from "../search-conge/search-conge.component";




export const CongeLayoutsRoutes: Routes = [
  { path: 'conge-creation',      component: CongeCreationComponent  },
  { path: 'conge-update',      component: CongeUpdateComponent },
  {path: 'conge-menu',      component: CongeMenuComponent },
  {path: 'conge-list',      component: CongeListComponent } ,
  {path: 'conge-search',      component: SearchCongeComponent }


];
