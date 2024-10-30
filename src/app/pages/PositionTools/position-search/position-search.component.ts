import {Component, OnInit} from '@angular/core';
import {NgbDropdown, NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle} from "@ng-bootstrap/ng-bootstrap";
import {PositionService} from "../service/position.service";
import {iconApp, manager, PositionModel} from "../../../models/models";
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {PositionListComponent} from "../position-list/position-list.component";
import {ToastrService} from "ngx-toastr";
import {NgxPaginationModule} from "ngx-pagination";
import Swal from "sweetalert2";

@Component({
  selector: 'app-position-search',
  standalone: true,

    imports: [
        NgbDropdown,
        NgbDropdownItem,
        NgbDropdownMenu,
        NgbDropdownToggle,
        FormsModule,
        NgForOf,
        RouterLink,
        RouterLinkActive,
        NgIf,
        NgxPaginationModule,

    ],
  templateUrl: './position-search.component.html',
  styleUrl: './position-search.component.css'
})
export class PositionSearchComponent implements  OnInit{
  protected dataSource: PositionModel[] = [] ;
  public keyword! : string ;
  public header = ["No" , "nom" , "description" , "actions"];
  currentPage = 1 ;


  constructor(
    protected service : PositionService  ,
    private toastr : ToastrService

  ){}
  ngOnInit(): void {
  }

  searchPosition(keyword : string){
      this.service.searchPosition(keyword).subscribe(data => {
          this.dataSource = data ;
          console.log(data)
          if(data.length == 0 )this.toastr.warning(iconApp + " Aucun poste  ne correspond à ce nom !! " , manager , {enableHtml:true});

      } , error => {
        console.log(error);
        this.toastr.error(iconApp + " Une erreur est survenue !!" , manager , {enableHtml:true});
      })
  }

  deletePosition(p : any){

    Swal.fire({
      title: "Voulez-vous supprimé ce poste ?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#9fec9a",
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
        this.service.deletePosition(p.id).subscribe(data =>{
          this.toastr.success(iconApp + " Suppression faite avec sccès!!!! " , manager , {enableHtml:true} );
          this.service.searchPosition(this.keyword).subscribe (data => {
            this.dataSource = [];
            if(data.length > 0) this.dataSource = data ;
            else  this.toastr.info(iconApp + " Plus aucun poste ne corresond a ce mot clé !!!"  ,manager , {enableHtml : true})
          })
        }  , error => {
          console.log(error);
          this.toastr.warning(iconApp+" Une erreur est survenu lors de la suppression !!!  \n vérifiez que ce poste n'est pas affecté a un employé" , manager , {enableHtml:true})
        })
      }

    });




  }


  pageChanged($event: number) {
      this.currentPage = $event

  }
}
