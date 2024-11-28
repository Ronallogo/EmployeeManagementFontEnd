import { Component } from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-notify',
  standalone: true,
  imports: [],
  animations: [
    trigger('slideInOut', [
      state('in', style({ transform: 'translateX(0)' })),
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('300ms ease-in')
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateX(100%)' }))
      ])
    ])
  ] ,
  templateUrl: './notify.component.html',
  styleUrl: './notify.component.css'
})
export class NotifyComponent {
  show = false;

  reloadNotification() {
    this.show = !this.show;
  }
}
