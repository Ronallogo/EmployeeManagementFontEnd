import { Component } from '@angular/core';
import {NgbDropdownItem, NgbDropdownMenu} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-position-creation',
  standalone: true,
  imports: [
    NgbDropdownItem,
    NgbDropdownMenu
  ],
  templateUrl: './position-creation.component.html',
  styleUrl: './position-creation.component.css'
})
export class PositionCreationComponent {

}
