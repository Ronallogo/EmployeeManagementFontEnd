import {Component, OnInit} from '@angular/core';
import {NgbDropdownItem, NgbDropdownMenu} from "@ng-bootstrap/ng-bootstrap";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {PositionService} from "../service/position.service";

@Component({
  selector: 'app-position-creation',
  standalone: true,
  imports: [
    NgbDropdownItem,
    NgbDropdownMenu,
    RouterLink,
    RouterLinkActive,
    FormsModule,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './position-creation.component.html',
  styleUrl: './position-creation.component.css'
})
export class PositionCreationComponent implements OnInit{
  protected show: boolean = false;
  protected position = new FormGroup({
      position_name : new FormControl('', [Validators.required]),
      position_description: new FormControl("")
  })

  constructor(private service :PositionService) {}
  ngOnInit(): void {
  }

  createPosition(){
      this.service.createPosition({...this.position.getRawValue()}).subscribe(data => {
          console.log(data);
          this.show  = true ;
      } , error => {
        console.log(error);
      })
  }


  reloadNotification() {
      this.show = false;
  }
}
