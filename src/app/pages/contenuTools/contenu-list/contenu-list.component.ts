import {Component, OnInit} from '@angular/core';
import {ContenuService} from "../service/contenu.service";
import {NgForOf, NgIf} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {ContenuModel, iconApp, manager} from "../../../models/models";
import {ToastrService} from "ngx-toastr";
import {NgxPaginationModule} from "ngx-pagination";
import Swal from "sweetalert2";

@Component({
  selector: 'app-contenu-list',
  standalone: true,
    imports: [
        NgForOf,
        NgIf,
        RouterLink,
        RouterLinkActive,
        NgxPaginationModule
    ],
  templateUrl: './contenu-list.component.html',
  styleUrl: './contenu-list.component.css'
})
export class ContenuListComponent implements OnInit{

  protected contenus: ContenuModel[] = [] ;

   protected  header = ["No" , "Titre" , "Thème" , "Nature" , "Langue" , "Date de création" , "Status" , "Actions"]
  currentPage:  number = 1;

  constructor(protected service : ContenuService , private toastr : ToastrService ) {}


  ngOnInit(): void {
     this.getAllContenu();
  }

  getAllContenu(){
     this.service.allContenu().subscribe (data => {
       console.log(data)
       this.contenus = data ;
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
          this.getAllContenu()
          this.toastr.success(iconApp + " Suppression effectué avec succès !!!" , manager , {enableHtml:true})
        } , error => {
          console.log(error);
          this.toastr.error(iconApp + " Erreur de suppression!!!!",manager ,{enableHtml:true})
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
      a.download = 'liste_contenu.pdf';
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
