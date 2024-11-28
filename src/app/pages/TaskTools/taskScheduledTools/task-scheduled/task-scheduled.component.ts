import { Component } from '@angular/core';
import {TaskScheduledMenuComponent} from "../task-scheduled-menu/task-scheduled-menu.component";

@Component({
  selector: 'app-task-scheduled',
  standalone: true,
  imports: [
    TaskScheduledMenuComponent
  ],
  templateUrl: './task-scheduled.component.html',
  styleUrl: './task-scheduled.component.css'
})
export class TaskScheduledComponent {

}
