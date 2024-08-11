import { Component } from '@angular/core';
import {NgbDropdown, NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-position-search',
  standalone: true,
    imports: [
        NgbDropdown,
        NgbDropdownItem,
        NgbDropdownMenu,
        NgbDropdownToggle
    ],
  templateUrl: './position-search.component.html',
  styleUrl: './position-search.component.css'
})
export class PositionSearchComponent {
  isCollapsed: any;

}
