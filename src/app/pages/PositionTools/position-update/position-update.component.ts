import {Component, OnInit} from '@angular/core';
import {PositionModels} from "../../../models/Position.models";
import {PositionService} from "../service/position.service";
import {FormGroup, FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {NgIf} from "@angular/common";

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
  templateUrl: './position-update.component.html',
  styleUrl: './position-update.component.css'
})
export class PositionUpdateComponent implements OnInit{
  ////variable qui nous permettra de modifier la position selectionner
  position!: PositionModels ;

  public id! : number ;

  formulaire  =  new FormGroup(
    { position_name: new FormControl() , position_description: new FormControl() }
  )
  show: boolean = false;





  constructor(public positionService: PositionService) {}

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

    console.log(this.position)
  }

  updatePosition(){
      this.positionService.updatePosition(this.id, {...this.formulaire.getRawValue()}).subscribe(data =>{
          console.log(data);
          this.show = true ;
      } , error => {
        console.log(error);
      })
  }


  reloadNotification() {
      this.show = false
  }
}
