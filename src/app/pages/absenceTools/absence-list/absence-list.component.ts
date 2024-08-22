import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {AbsenceService} from "../service/absence.service";
import {AbsenceModel} from "../../../models/models";
import {NgForOf, NgIf} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-absence-list',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink,
    RouterLinkActive,
    NgIf
  ],
  templateUrl: './absence-list.component.html',
  styleUrl: './absence-list.component.css'
})
export class AbsenceListComponent implements OnInit{

  absences : any[] = [];
  protected show: boolean = false;
  private show2: boolean = false;

  protected header : string[] = ["No" , "le nom de l'employé", "Date de l'absence" , "Raison de l'absence" , "Actions"];


  constructor(protected service: AbsenceService){}

  ngOnInit(): void {
      this.getAllAbsences();
  }

  getAllAbsences(){
      this.service.allAbsence().subscribe(data =>{
        this.absences = data;
        this.show = false ;
      } , error => {
        console.log(error)
      })
  }

  deleteAbsence(id : number) {
      this.service.deleteAbsence(id).subscribe(data =>{
        console.log(data);
        this.show = true ;

      })
  }
  reloadNotification() {
    this.show = false ;
    this.show2 =false;
    window.location.reload();
  }
}
