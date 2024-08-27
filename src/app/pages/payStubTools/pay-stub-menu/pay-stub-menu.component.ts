import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-pay-stub-menu',
  standalone: true,
    imports: [
        RouterLink,
        RouterLinkActive,
        RouterOutlet
    ],
  templateUrl: './pay-stub-menu.component.html',
  styleUrl: './pay-stub-menu.component.css'
})
export class PayStubMenuComponent {

}
