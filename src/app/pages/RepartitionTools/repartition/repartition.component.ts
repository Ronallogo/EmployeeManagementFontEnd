import { Component } from '@angular/core';
import {RepartitionMenuComponent} from "../repartition-menu/repartition-menu.component";

@Component({
  selector: 'app-repartition',
  standalone: true,
  imports: [
    RepartitionMenuComponent
  ],
  templateUrl: './repartition.component.html',
  styleUrl: './repartition.component.css'
})
export class RepartitionComponent {

}
