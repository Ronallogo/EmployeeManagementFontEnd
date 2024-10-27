import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {AbsenceService} from "../service/absence.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {iconApp, manager} from "../../../models/models";

@Component({
  selector: 'app-absence-search',
  standalone: true,
    imports: [
        NgForOf,
        RouterLink,
        RouterLinkActive,
        FormsModule,
        ReactiveFormsModule,
        NgIf
    ],
  templateUrl: './absence-search.component.html',
  styleUrl: './absence-search.component.css'
})
export class AbsenceSearchComponent implements OnInit {

  protected header : string[] = ["No" , "le nom de l'employé", "Date de l'absence" , "Raison de l'absence" , "Actions"];
  absences:  any[]= [];
  private show: boolean = false;
  keyword!:   number;

  constructor(protected service: AbsenceService , private toastr: ToastrService){}

  ngOnInit(): void {
  }



  search(keyword :number){
    this.absences = [];
    this.keyword = keyword
    this.service.searchAbsenceById(keyword).subscribe(data =>{
      if(data == null) this.toastr.warning(iconApp + " l'employé ayant cet identifiant n'a aucune absence !!" , manager , {enableHtml:true});
      else  this.absences.push(data)
    } , error => {
      console.log(error);
      this.toastr.warning(iconApp+ `ce genre de caractère n'est pas permit  ` , manager , {enableHtml:true});
    })
  }

  deleteAbsence(id : number) {
    let conf  =  confirm("Cette absence sera supprimée !!")
    if(!conf) return;

    this.service.deleteAbsence(id).subscribe(data =>{
      this.toastr.success(iconApp + " Cette absence a été supprimé avec succès!! " , manager , {enableHtml:true});
      this.absences = [];
      this.service.searchAbsenceById(id).subscribe(data =>{
        if(data.length == 0) this.toastr.info(iconApp+"Aucune autre absence n' été trouvée !!" , manager , {enableHtml:true});
      })
    } , error => {
      console.log(error);
      this.toastr.error(iconApp + " Une erreur est survenue lors de la suppression !!!"  ,manager , {enableHtml : true});
    })
  }




}
