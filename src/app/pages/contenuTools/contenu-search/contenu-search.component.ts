import {Component, OnInit} from '@angular/core';
import {ContenuService} from "../service/contenu.service";
import {ContenuModel, iconApp, manager} from "../../../models/models";
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {NgxPaginationModule} from "ngx-pagination";
import Swal from "sweetalert2";

@Component({
  selector: 'app-contenu-search',
  standalone: true,
    imports: [
        FormsModule,
        NgForOf,
        RouterLink,
        RouterLinkActive,
        NgIf,
        NgxPaginationModule
    ],
  templateUrl: './contenu-search.component.html',
  styleUrl: './contenu-search.component.css'
})
export class ContenuSearchComponent implements OnInit{
  public keyword : string = "";

  protected contenuPicked: ContenuModel[] = [] ;

  protected  header = ["No" , "Titre" , "Thème" , "Nature" , "Langue" , "Date de création" , "status" , "Actions"]
  currentPage:  number = 1;
  constructor(protected service : ContenuService , private toastr : ToastrService) {
  }

  ngOnInit(): void {
  }

  searchContenu(keyword: string){
      this.keyword = keyword;
      this.service.searchContenu(keyword).subscribe (data => {
          this.contenuPicked = data;
          if(data.length == 0 ) this.toastr.warning(iconApp + " Aucun contenu ne correspond a cet intitulé !! " , manager , {enableHtml:true});
      } , error => {
        console.log(error);
      })
  }
  deleteContenu(c : any) {

    Swal.fire({
      title: "Voulez vous supprimé le contenu :  "+c.title+" ?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#94ec8f",
      cancelButtonColor: "#e62b2b",
      confirmButtonText: "Supprimer" ,
      cancelButtonText: "annuler" ,
      backdrop: `
    rgba(0,0,0,0.4)
    left top
    no-repeat
  ` ,
      showClass: {
        popup: `
      animate__animated
      animate__fadeInUp

    `
      },
      hideClass: {
        popup: `
      animate__animated
      animate__fadeOutDown
      animate__faster
    `
      }

    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteContenu(c.id).subscribe (data => {
          this.service.searchContenu(this.keyword).subscribe (data => {
            if(data.length > 0 ) this.contenuPicked = data
            else  this.toastr.info(iconApp + "Plus aucun contenu ne correspond a ce mot clé!!!"  ,manager , {enableHtml : true})
          })
        } , error => {
          console.log(error);
        })

      }

    });

  }

  pageChanged($event: number) {
    this.currentPage = $event

  }
}
