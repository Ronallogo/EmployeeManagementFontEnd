import { Routes } from '@angular/router';
import {TaskCreationComponent} from "../task-creation/task-creation.component";
import {TaskSearchComponent} from "../task-search/task-search.component";
import {TaskMenuComponent} from "../task-menu/task-menu.component";
import {TaskListComponent} from "../task-list/task-list.component";
import {TaskUpdateComponent} from "../task-update/task-update.component";
import {
  TaskInsertionCreationComponent
} from "../task_insertion/task-insertion-creation/task-insertion-creation.component";
import {TaskInsertionUpdateComponent} from "../task_insertion/task-insertion-update/task-insertion-update.component";
import {TaskInsertionListComponent} from "../task_insertion/task-insertion-list/task-insertion-list.component";



export const TaskLayoutsRoutes: Routes = [
  { path: 'task-creation',      component: TaskCreationComponent  },
  { path: 'task-update',      component:  TaskUpdateComponent },
  { path: 'task-search',      component: TaskSearchComponent },
  {path: 'task-menu',      component: TaskMenuComponent },
  {path: 'task-list',      component: TaskListComponent },
  {path: 'task-insertion-list',      component: TaskInsertionListComponent },
  { path: 'task-insertion-creation',      component: TaskInsertionCreationComponent  },
  { path: 'task-insertion-update',      component:  TaskInsertionUpdateComponent },


];
