import { Component } from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {AbsenceModel, AbsenceModel2, iconApp, manager, PositionModel} from "../../../models/models";
import {PositionService} from "../../PositionTools/service/position.service";
import {AbsenceService} from "../service/absence.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-absence-update',
  standalone: true,
    imports: [
        FormsModule,
        NgIf,
        ReactiveFormsModule
    ],
  templateUrl: './absence-update.component.html',
  styleUrl: './absence-update.component.css'
})
export class AbsenceUpdateComponent {
  ////variable qui nous permettra de modifier la position selectionner
  absence!: AbsenceModel ;

  public id! : number ;

  formulaire  =  new FormGroup(
    { date: new FormControl() , reason: new FormControl() , employee : new FormControl() }
  )
  show: boolean = false;





  constructor(private service: AbsenceService , private toastr : ToastrService,) {}

  ngOnInit(): void {
    this.initialize()

  }

  initialize(){
    this.absence = this.service.getAbsence();
    this.formulaire.setValue(
      {
        date : this.absence.date ,
        reason: this.absence.reason,
        employee: this.absence.employee ,

      }
    )
    this.id = this.absence.id

    console.log(this.absence)
  }

  updateAbsence(){
    this.service.updateAbsence(this.id, {...this.formulaire.getRawValue()}).subscribe(data =>{
      console.log(data);
      this.toastr.success(iconApp+ "mise à jour effectuée avec succès !!!" , manager , {enableHtml:true})
    } , error => {
      console.log(error);
      this.toastr.error(iconApp+" Une erreur est survenue au niveau de la mise à jour!!!" , manager , {enableHtml:true})
    })
  }



}
