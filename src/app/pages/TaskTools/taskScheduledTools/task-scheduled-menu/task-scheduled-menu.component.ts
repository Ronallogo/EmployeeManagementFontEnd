import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-task-scheduled-menu',
  standalone: true,
    imports: [
        RouterLink,
        RouterLinkActive,
        RouterOutlet
    ],
  templateUrl: './task-scheduled-menu.component.html',
  styleUrl: './task-scheduled-menu.component.css'
})
export class TaskScheduledMenuComponent {

}
