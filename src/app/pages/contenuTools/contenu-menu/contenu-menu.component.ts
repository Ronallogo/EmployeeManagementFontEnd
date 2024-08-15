import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-contenu-menu',
  standalone: true,
    imports: [
        RouterLink,
        RouterLinkActive,
        RouterOutlet
    ],
  templateUrl: './contenu-menu.component.html',
  styleUrl: './contenu-menu.component.css'
})
export class ContenuMenuComponent {

}
