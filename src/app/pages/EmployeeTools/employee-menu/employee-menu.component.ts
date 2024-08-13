import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-employee-menu',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './employee-menu.component.html',
  styleUrl: './employee-menu.component.css'
})
export class EmployeeMenuComponent {

}
