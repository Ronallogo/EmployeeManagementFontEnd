import { Component } from '@angular/core';
import {EmployeeMenuComponent} from "../../EmployeeTools/employee-menu/employee-menu.component";
import {PositionMenuComponent} from "../position-menu/position-menu.component";

@Component({
  selector: 'app-position',
  standalone: true,
  imports: [
    EmployeeMenuComponent,
    PositionMenuComponent
  ],
  templateUrl: './position.component.html',
  styleUrl: './position.component.css'
})
export class PositionComponent {

}
