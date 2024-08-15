import { Component } from '@angular/core';
import {ContenuMenuComponent} from "../contenu-menu/contenu-menu.component";

@Component({
  selector: 'app-contenu',
  standalone: true,
  imports: [
    ContenuMenuComponent
  ],
  templateUrl: './contenu.component.html',
  styleUrl: './contenu.component.css'
})
export class ContenuComponent {

}
