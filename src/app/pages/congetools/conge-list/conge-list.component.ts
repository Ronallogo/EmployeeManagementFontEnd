import {Component, OnInit} from '@angular/core';
import {CongeService} from "../service/conge.service";
import {NgForOf, NgIf} from "@angular/common";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {iconApp, manager} from "../../../models/models";
import {NgxPaginationModule} from "ngx-pagination";
import Swal from "sweetalert2";

@Component({
  selector: 'app-conge-list',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink,
    RouterLinkActive,
    NgIf,
    NgxPaginationModule
  ],
  templateUrl: './conge-list.component.html',
  styleUrl: './conge-list.component.css'
})
export class CongeListComponent implements OnInit{
  protected listConge : any[] =  [];
  protected currentPage : number = 1 ;


  protected header : string[] = ["No" , "début de congé" , "fin de congé" , "type de congé" , "status" , "demande de" , "actions"]

  constructor(protected service : CongeService   , private toastr : ToastrService ) { }


  ngOnInit(): void {
    this.allConge();
  }


  deleteConge(p : any) {



    Swal.fire({
      title: "Voulez vous annulé ce congé ?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#9fec9a",
      cancelButtonColor: "#e62b2b",
      confirmButtonText: "oui" ,
      cancelButtonText: "non" ,
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
        this.service.deleteConge(p.id).subscribe(data =>{
          this.allConge()
          this.toastr.success(iconApp+" congé annulé avec succès...." , manager , {enableHtml:true});

        })
      }

    });



  }

  allConge(){
    this.service.allConges().subscribe(data =>{
      this.listConge = data;
    } , error => {
      console.log(error);
      this.toastr.error(iconApp+ " Une erreur est survenue au !!" , manager , {enableHtml:true});

    })
  }






  generePdf(){
    this.service.report().subscribe((data : Blob) => {
      console.log(data);
      const blob = new Blob([data], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'liste_congé.pdf';
      a.click();
      URL.revokeObjectURL(url);
      this.toastr.success(iconApp+" génération réussie !! \n"+data , manager , {enableHtml:true} );
    } , error => {
      this.toastr.error(iconApp +" Erreur de génération!!!!" , manager , {enableHtml:true});
      console.log(error)
    })
  }

  pageChanged($event: number) {
      this.currentPage = $event ;
  }
}
