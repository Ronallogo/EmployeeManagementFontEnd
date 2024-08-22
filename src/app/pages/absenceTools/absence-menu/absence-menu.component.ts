import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-absence-menu',
  standalone: true,
  imports: [
    RouterLinkActive,
    RouterLink,
    RouterOutlet
  ],
  templateUrl: './absence-menu.component.html',
  styleUrl: './absence-menu.component.css'
})
export class AbsenceMenuComponent {

}
