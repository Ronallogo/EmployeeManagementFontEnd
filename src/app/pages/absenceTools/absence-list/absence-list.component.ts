import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {AbsenceService} from "../service/absence.service";
import {AbsenceModel, iconApp, manager} from "../../../models/models";
import {NgForOf, NgIf} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {ToastrService} from "ngx-toastr";

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
  public icon = `<i class="nc-icon nc-chart-bar-32 "></i>`;
  public customTitle = '<span style=""><i class="nc-icon nc-chart-bar-32 "></i> EMPLOYEE MANAGER</span>';

  constructor(protected service: AbsenceService ,  public toastr: ToastrService){}

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
        this.toastr.success(this.icon+"Absence created successfully!!!!" , this.customTitle , {
          enableHtml: true
        });

      })
  }

  generePdf(){
    this.service.report().subscribe((data : Blob) => {
      console.log(data);
      const blob = new Blob([data], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'liste_absence.pdf';
      a.click();
      URL.revokeObjectURL(url);
      this.toastr.success(iconApp+" génération réussie !! \n"+data , manager , {enableHtml:true} );
    } , error => {
      this.toastr.error(iconApp +" Erreur de génération!!!!" , manager , {enableHtml:true});
      console.log(error)
    })
  }
}
