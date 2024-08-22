import {Component, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {AbsenceService} from "../service/absence.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

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

  constructor(protected service: AbsenceService){}

  ngOnInit(): void {
  }



  search(keyword :string){
    console.log(keyword)
    this.service.searchAbsence(keyword).subscribe(data =>{
        this.absences = data
        console.log(data)
    } , error => {
      console.log(error);
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
    window.location.reload();
  }



}
