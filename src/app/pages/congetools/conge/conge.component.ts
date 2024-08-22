import {Component, OnInit} from '@angular/core';
import {CongeMenuComponent} from "../conge-menu/conge-menu.component";

@Component({
  selector: 'app-conge',
  standalone: true,
  imports: [
    CongeMenuComponent
  ],
  templateUrl: './conge.component.html',
  styleUrl: './conge.component.css'
})
export class CongeComponent implements OnInit {



  ngOnInit(): void {
  }

}
