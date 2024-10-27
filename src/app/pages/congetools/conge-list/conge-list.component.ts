import {Component, OnInit} from '@angular/core';
import {CongeService} from "../service/conge.service";
import {NgForOf, NgIf} from "@angular/common";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {iconApp, manager} from "../../../models/models";

@Component({
  selector: 'app-conge-list',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink,
    RouterLinkActive,
    NgIf
  ],
  templateUrl: './conge-list.component.html',
  styleUrl: './conge-list.component.css'
})
export class CongeListComponent implements OnInit{
  protected listConge : any[] =  [];


  protected header : string[] = ["No" , "début de congé" , "fin de congé" , "type de congé" , "status" , "demande de" , "actions"]

  constructor(protected service : CongeService   , private toastr : ToastrService ) { }


  ngOnInit(): void {
    this.allConge();
  }


  deleteConge(id : number) {


    let conf = confirm("Are you sure you want to delete this conge?");
    if(!conf) return;
    this.service.deleteConge(id).subscribe(data =>{
      this.allConge()
      this.toastr.success(iconApp+" congé supprimé avec succès...." , manager , {enableHtml:true});

    })
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

}
