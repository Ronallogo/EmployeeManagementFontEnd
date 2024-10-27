import {Component, OnInit} from '@angular/core';
import {iconApp, manager, PositionModel} from "../../../models/models";
import {PositionService} from "../service/position.service";
import {FormGroup, FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {NgIf} from "@angular/common";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-position-update',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    FormsModule,
    ReactiveFormsModule,
    NgIf
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
  templateUrl: './position-update.component.html',
  styleUrl: './position-update.component.css'
})
export class PositionUpdateComponent implements OnInit{
  ////variable qui nous permettra de modifier la position selectionner
  position!: PositionModel ;

  public id! : number ;

  formulaire  =  new FormGroup(
    { position_name: new FormControl() , position_description: new FormControl() }
  )
  show: boolean = false;





  constructor(public positionService: PositionService , private toastr : ToastrService) {}

  ngOnInit(): void {
     this.initialize()

  }

  initialize(){
    this.position = this.positionService.getPosition();
    this.formulaire.setValue(
      {
        position_name: this.position.position_name ,
        position_description: this.position.position_description ,

      }
    )
    this.id = this.position.id

  }

  updatePosition(){
      this.positionService.updatePosition(this.id, {...this.formulaire.getRawValue()}).subscribe(data =>{
          console.log(data);
          this.toastr.success(iconApp+"Ce poste a été modifié avec succès" , manager , {enableHtml:true})
      } , error => {
        console.log(error);
        this.toastr.error(iconApp+"unse erreur est survenu" , manager , {enableHtml:true})
      })
  }



}
