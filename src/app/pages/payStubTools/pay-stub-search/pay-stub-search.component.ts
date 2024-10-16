import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PayStubService} from "../service/pay-stub.service";
import {iconApp, manager, PayStubModel2} from "../../../models/models";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-pay-stub-search',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink,
    RouterLinkActive,
    FormsModule,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './pay-stub-search.component.html',
  styleUrl: './pay-stub-search.component.css'
})
export class PayStubSearchComponent implements OnInit{
  keyword!:  number ;

  protected ListPayStubList:  PayStubModel2[]  = [];
  header: string[] = ["No"  , "Nom de l'employé" , "nombre de tache faites" , "bonus reçu" , "date de création du bulletin" , "montant" , "actions"]  ;

  constructor(protected service : PayStubService , private toastr : ToastrService ,) {}



  ngOnInit(): void {
  }

  search(keyword: number){
    this.service.searchPayStubById(this.keyword).subscribe(data => {

        if(data != null )   this.ListPayStubList.push(data);
        else   this.toastr.warning(iconApp+"Aucun employé n'a cet identifiant !!" , manager , {enableHtml:true})


    },error => {

      this.toastr.error(iconApp+"une erreur c est produite !!!" , manager , {enableHtml:true});
      console.log(error);
    });
  }

  deletePayStub(id: number) {
    let conf = confirm("voulez vous vraiment supprimer??");
    if(!conf) return ;
    this.service.deletePayStub(id).subscribe(data =>{
      console.log(data);
      this.toastr.success(iconApp+" le bulletin de paie a été supprimé" , manager , {enableHtml:true})
    },error => {
      console.log(error);
      this.toastr.error(iconApp+" le bulletin n'a pas pu etre supprimer !!" , manager , {enableHtml:true})
    })
  }
}
