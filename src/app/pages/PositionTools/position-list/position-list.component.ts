import {Component, Injector, OnInit} from '@angular/core';

import {count, Observable} from "rxjs";
import {PositionService} from "../service/position.service";
import {iconApp, manager, PositionModel} from "../../../models/models";
import {NgForOf, NgIf} from "@angular/common";
import {NgbDropdownToggle} from "@ng-bootstrap/ng-bootstrap";
import {RouterLink, RouterLinkActive, RouterModule} from "@angular/router";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {ToastrService} from "ngx-toastr";
import {NgxPaginationModule} from "ngx-pagination";
import Swal from "sweetalert2";


@Component({
  selector: 'app-position-list',
  standalone: true,
  imports: [
    NgForOf,
    NgbDropdownToggle,
    RouterLink,
    RouterLinkActive,
    NgIf,
    NgxPaginationModule
  ],
  animations: [
    trigger('slideInOut', [
      state('in', style({ transform: 'translateX(0)' })),
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('800ms ease-in')
      ]),
      transition(':leave', [
        animate('800ms ease-in', style({ transform: 'translateX(100%)' }))
      ])
    ])
  ] ,
  templateUrl: './position-list.component.html',
  styleUrl: './position-list.component.css'
})
export class PositionListComponent implements  OnInit{
  protected dataSource: any[] = [] ;
  show: boolean = false;
  private format : string = "pdf";




  public header = ["No" , "nom" , "description" , "actions"];
  constructor(
    protected service : PositionService ,
    private  toastr  : ToastrService
  ) {
  }



  ngOnInit(): void {
      this.getAllPosition()
  }

  getAllPosition(){
    this.service.allPositions().subscribe(data => {
      this.dataSource = data ;

    } , error => {
      console.log(error) ;
      this.toastr.error(iconApp + " Une erreur de chargement des données!!!",manager , {enableHtml:true} );
    });
  }

  deletePosition(id : number , position : PositionModel){

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
        this.service.deletePosition(id).subscribe(data =>{
          this.toastr.success(iconApp + " Suppression faite avec sccès!!!!" , manager , {enableHtml:true} );
          this.getAllPosition();

        }  , error => {
          console.log(error);
          this.toastr.warning(iconApp+" Une erreur est survenu lors de la suppression !!!  \n vérifiez que ce poste n'est pas affecté a un employé" , manager , {enableHtml:true})
        })
      }

    });

  }

  generePdf(){
    this.service.report().subscribe((data : Blob) => {
      console.log(data);
      const blob = new Blob([data], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'liste_poste.pdf'; // You can dynamically set the filename if needed
      a.click();
      URL.revokeObjectURL(url);
      this.toastr.success(iconApp+" génération réussie !! \n"+data , manager , {enableHtml:true} );
    } , error => {
      this.toastr.error(iconApp +" Erreur de génération!!!!" , manager , {enableHtml:true});
      console.log(error)
    })
  }




  currentPage:  number = 1 ;

  pageChanged($event: number) {
    this.currentPage = $event
  }
}
