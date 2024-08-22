import { Component } from '@angular/core';
import {AbsenceMenuComponent} from "../absence-menu/absence-menu.component";

@Component({
  selector: 'app-absence',
  standalone: true,
  imports: [
    AbsenceMenuComponent
  ],
  templateUrl: './absence.component.html',
  styleUrl: './absence.component.css'
})
export class AbsenceComponent {

}
