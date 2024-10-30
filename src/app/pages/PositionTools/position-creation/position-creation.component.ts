import {Component, OnInit} from '@angular/core';
import {NgbDropdownItem, NgbDropdownMenu} from "@ng-bootstrap/ng-bootstrap";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgClass, NgIf} from "@angular/common";
import {PositionService} from "../service/position.service";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {ToastrService} from "ngx-toastr";
import {iconApp, manager} from "../../../models/models";

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
    ReactiveFormsModule,
    NgClass
  ],
  animations: [
    trigger('slideInOut', [
      state('in', style({ transform: 'translateX(0)' })),
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('800ms ease-in')
      ]),
      transition(':leave', [
        animate('800ms ease-in', style({ transform: 'translateX(100%)' }))
      ])
    ])
  ] ,
  templateUrl: './position-creation.component.html',
  styleUrl: './position-creation.component.css'
})
export class PositionCreationComponent implements OnInit{
  protected show: boolean = false;
  protected position = new FormGroup({
      position_name : new FormControl('', [Validators.required]),
      position_description: new FormControl("" , [Validators.required])
  })

  constructor(private service :PositionService ,private toastr : ToastrService) {}
  ngOnInit(): void {
  }

  createPosition(){
      this.service.createPosition({...this.position.getRawValue()}).subscribe(data => {
          this.toastr.success(iconApp+' Ce poste a été enregistré avec succès!!',manager ,{enableHtml:true});
      } , error => {
        this.toastr.error(iconApp+"une erreur est survenu",manager,{enableHtml:true})
        console.log(error);
      })
  }


  reloadNotification() {
      this.show = false;
  }
}
