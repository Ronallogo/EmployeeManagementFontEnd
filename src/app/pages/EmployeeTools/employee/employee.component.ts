import { Component } from '@angular/core';
import {EmployeeMenuComponent} from "../employee-menu/employee-menu.component";

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [
    EmployeeMenuComponent
  ],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent {

}
