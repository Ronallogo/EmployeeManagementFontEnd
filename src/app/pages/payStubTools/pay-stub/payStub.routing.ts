import { Routes } from '@angular/router';
import {EmployeeSearchComponent} from "../../EmployeeTools/employee-search/employee-search.component";
import {PayStubSearchComponent} from "../pay-stub-search/pay-stub-search.component";
import {PayStubListComponent} from "../pay-stub-list/pay-stub-list.component";
import {PayStubMenuComponent} from "../pay-stub-menu/pay-stub-menu.component";
import {PayStubUpdateComponent} from "../pay-stub-update/pay-stub-update.component";




export const PayStubLayoutsRoutes: Routes = [
 /* { path: 'payStub-creation',      component: PayStubCreationComponent  },*/
  { path: 'payStub-update',      component: PayStubUpdateComponent },
  {path: 'payStub-menu',      component: PayStubMenuComponent },
  {path: 'payStub-list',      component: PayStubListComponent },
  {path: 'payStub-search',      component: PayStubSearchComponent },

];
