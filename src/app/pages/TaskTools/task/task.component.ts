import { Component } from '@angular/core';
import {TaskMenuComponent} from "../task-menu/task-menu.component";

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [
    TaskMenuComponent
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {

}
