import {Component, OnInit} from '@angular/core';
import {PositionService} from "../../PositionTools/service/position.service";
import {ContenuService} from "../service/contenu.service";
import {NgForOf, NgIf} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {ContenuModel, ContenuModel2, iconApp, manager} from "../../../models/models";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-contenu-list',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './contenu-list.component.html',
  styleUrl: './contenu-list.component.css'
})
export class ContenuListComponent implements OnInit{

  protected contenus: ContenuModel[] = [] ;

   protected  header = ["No" , "Titre" , "Thème" , "Nature" , "Langue" , "Date de création" , "Status" , "Actions"]

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

  deleteContenu(id:number) {
      this.service.deleteContenu(id).subscribe (data => {
         console.log(data);
         window.location.reload();
         this.toastr.success(iconApp + " Suppression réussie !!!" , manager , {enableHtml:true})
      } , error => {
        console.log(error);
        this.toastr.error(iconApp + " Erreur de suppression!!!!",manager ,{enableHtml:true})
      })
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
}
