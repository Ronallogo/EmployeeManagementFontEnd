import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {AbsenceService} from "../service/absence.service";
import {AbsenceModel, iconApp, manager} from "../../../models/models";
import {NgForOf, NgIf} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {NgxPaginationModule} from "ngx-pagination";

@Component({
  selector: 'app-absence-list',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink,
    RouterLinkActive,
    NgIf,
    NgxPaginationModule
  ],
  templateUrl: './absence-list.component.html',
  styleUrl: './absence-list.component.css'
})
export class AbsenceListComponent implements OnInit{

  absences : any[] = [];
  protected show: boolean = false;
  private show2: boolean = false;

  protected header : string[] = ["No" , "le nom de l'employé", "Date de l'absence" , "Raison de l'absence" , "Actions"];


  protected currentPage: number = 1;

  constructor(protected service: AbsenceService ,  public toastr: ToastrService){}

  ngOnInit(): void {
      this.getAllAbsences();
  }

  getAllAbsences(){
      this.service.allAbsence().subscribe(data =>{
        this.absences = data;
      } , error => {
        console.log(error)
      })
  }

  deleteAbsence(id : number) {
      let conf = confirm("Cette absence sera suprimmée !!")
      if(!conf) return ;
      this.service.deleteAbsence(id).subscribe(data =>{
        this.toastr.success(iconApp+"Absence created successfully!!!!" , manager , {
          enableHtml: true
        });
        this.getAllAbsences()
      })
  }

  generePdf(){
    this.service.report().subscribe((data : Blob) => {

      const blob = new Blob([data], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'liste_absence.pdf';
      a.click();
      URL.revokeObjectURL(url);
      this.toastr.success(iconApp+" génération réussie !! \n", manager , {enableHtml:true} );
    } , error => {
      this.toastr.error(iconApp +" Erreur de génération!!!!" , manager , {enableHtml:true});
      console.log(error)
    })
  }

  pageChanged($event: number) {
      this.currentPage = $event ;
  }
}
