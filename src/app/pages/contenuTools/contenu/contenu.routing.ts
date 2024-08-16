import { Routes } from '@angular/router';
import {ContenuListComponent} from "../contenu-list/contenu-list.component";
import {ContenuMenuComponent} from "../contenu-menu/contenu-menu.component";
import {ContenuUpdateComponent} from "../contenu-update/contenu-update.component";
import {ContenuCreationComponent} from "../contenu-creation/contenu-creation.component";
import {ContenuSearchComponent} from "../contenu-search/contenu-search.component";




export const ContenuLayoutsRoutes: Routes = [
  { path: 'contenu-creation',      component:   ContenuCreationComponent  },
  { path: 'contenu-update',      component: ContenuUpdateComponent },
  { path: 'contenu-search',      component: ContenuSearchComponent },
  {path: 'contenu-menu',      component:ContenuMenuComponent },
  {path: 'contenu-list',      component: ContenuListComponent }


];
