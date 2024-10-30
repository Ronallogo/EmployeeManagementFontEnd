import { Routes } from '@angular/router';
import {TaskListComponent} from "../../task-list/task-list.component";
import {ListTaskScheduledComponent} from "../list-task-scheduled/list-task-scheduled.component";
import {
  TaskScheduledCreationComponent
} from "../task-scheduled-creation/task-scheduled-creation.component";
import {TaskScheduledSearchComponent} from "../task-scheduled-search/task-scheduled-search.component";
import {TaskScheduledUpdateComponent} from "../task-scheduled-update/task-scheduled-update.component";



export const TaskScheduledLayoutsRoutes: Routes = [
  {path : "task-scheduled-list" , component: ListTaskScheduledComponent},
  {path : "task-scheduled-creation" , component:  TaskScheduledCreationComponent},
  {path : "task-scheduled-search" , component:  TaskScheduledSearchComponent},
  {path : "task-scheduled-update" , component:  TaskScheduledUpdateComponent},
  {path : "task-scheduled-list" , component:   ListTaskScheduledComponent},



];
