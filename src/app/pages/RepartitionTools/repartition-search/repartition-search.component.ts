import {Component, OnInit} from '@angular/core';
import {iconApp, manager, repartition} from "../../../models/models";
import {RepartitionService} from "../repartition/repartition.service";
import {ToastrService} from "ngx-toastr";
import {NgIf} from "@angular/common";
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {NgxPaginationModule} from "ngx-pagination";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import Swal from "sweetalert2";

@Component({
  selector: 'app-repartition-search',
  standalone: true,
  imports: [
    NgIf,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './repartition-search.component.html',
  styleUrl: './repartition-search.component.css'
})
export class RepartitionSearchComponent implements OnInit {
  protected header:  string[] = ["Photo","Nom","Email","Poste","Role"];
  protected listRepartition : repartition[] = [];
  views:  boolean = false;
  protected keyword : string = "";
  totalItems: number = 0;
  pageSize: number = 1;
  currentPage: number = 1;
  constructor(private service : RepartitionService , private toastr : ToastrService  ){}


  ngOnInit(): void {
  }

  deleteEmployeeFromRepartition(id : number){
    this.service.deleteEmployeeFromRepartition(id).subscribe(data =>{


      this.setViews()
      this.toastr.success(iconApp+"Cet employé a été retiré de la tache avec succès!!!" , manager , {enableHtml : true});

    } , error => {
      console.log(error);
    })
  }

  searchRepartition(keyword : string){

    this.service.searchRepartition(keyword).subscribe(data => {
      this.listRepartition = data
      this.totalItems = data.length;
      if(data.length == 0 ) {

        Swal.fire({
          position: "center",
          icon: "info",
          title: "Aucune tache ayant ce nom n'a été reparti",
          showConfirmButton: false,
          timer: 2000
        });
      }

    } , error => {
      console.log(error)
      this.toastr.warning(iconApp+"Erreur de chargement des repartition" , manager , {enableHtml:true} );
    })
  }

  getImageUrl(photo: any) {
    return `data:image/jpg;base64,${photo}`;
  }
  setViews(){
    this.views = !this.views
  }


  pageChanged($event: number) {
    this.currentPage = $event

  }
}
