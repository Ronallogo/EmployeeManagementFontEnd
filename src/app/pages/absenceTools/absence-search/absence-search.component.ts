import {Component, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
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
    ReactiveFormsModule
  ],
  templateUrl: './absence-search.component.html',
  styleUrl: './absence-search.component.css'
})
export class AbsenceSearchComponent implements OnInit {

  protected header : string[] = ["No" , "le nom de l'employé", "Date de l'absence" , "Raison de l'absence" , "Actions"];
  absences:  any[]= [];
  private show: boolean = false;
  keyword:  string = "";

  constructor(protected service: AbsenceService , private toastr: ToastrService){}

  ngOnInit(): void {
  }



  search(keyword :string){
    console.log(keyword)
    this.service.searchAbsence(keyword).subscribe(data =>{
        this.absences = data
        console.log(data)
        if(this.absences.length == 0) this.toastr.warning(iconApp+" Aucune Absence ne corresponds à ce mot clé !! " , manager , {enableHtml:true});
    } , error => {
      console.log(error);
      this.toastr.warning(iconApp+ `ce genre de caractère n'est pas permit : ${keyword} ` , manager , {enableHtml:true});
    })
  }

  deleteAbsence(id : number) {
    let conf  =  confirm("Cette absence sera supprimée !!")

    if(!conf) return;

    this.service.deleteAbsence(id).subscribe(data =>{
      console.log(data);
      this.toastr.success(iconApp + " Cette absence a été supprimé avec succès!! " , manager , {enableHtml:true});


    } , error => {
      console.log(error);
      this.toastr.error(iconApp + " Une erreur est survenue lors de la suppression !!!"  ,manager , {enableHtml : true})
    })
  }




}
