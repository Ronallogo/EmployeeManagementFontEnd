import {Component, OnInit} from '@angular/core';
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
export class AbsenceUpdateComponent  implements  OnInit{
  ////variable qui nous permettra de modifier la position selectionner
  absence!: AbsenceModel ;

  public id! : number ;

  formulaire!: { absence_day: string; reason: string; email: string }



  constructor(private service: AbsenceService , private toastr : ToastrService,) {}

  ngOnInit(): void {
    this.initialize()

  }

  initialize(){
    this.absence = this.service.getAbsence();
    this.formulaire = {
      absence_day : this.absence.date ,
      reason: this.absence.reason,
      email: this.absence.employee.email ,

      }
    this.id = this.absence.id

  }

  updateAbsence(){
    this.service.updateAbsence(this.id, this.formulaire).subscribe(data =>{
      this.toastr.success(iconApp+ "mise à jour effectuée avec succès !!!" , manager , {enableHtml:true})
    } , error => {
      console.log(error);
      this.toastr.error(iconApp+" Une erreur est survenue au niveau de la mise à jour!!!" , manager , {enableHtml:true})
    })
  }



}
