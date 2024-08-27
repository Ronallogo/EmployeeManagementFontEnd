import {Component, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
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
    ReactiveFormsModule
  ],
  templateUrl: './pay-stub-search.component.html',
  styleUrl: './pay-stub-search.component.css'
})
export class PayStubSearchComponent implements OnInit{
  keyword: string  =  "";

  protected ListPayStubList:  PayStubModel2[]  = [];
  header: string[] = ["No"  , "Nom de l'employé" , "nombre de tache faites" , "bonus reçu" , "date de création du bulletin" , "montant" , "actions"]  ;

  constructor(protected service : PayStubService , private toastr : ToastrService ,) {}



  ngOnInit(): void {
  }

  search(keyword: string ){
    this.service.searchPayStub(this.keyword).subscribe(data => {
        console.log(data);
        if(data.length  == 0 ) this.toastr.warning(iconApp+" aucun bulletin ne correspond à ce mot clé" , manager , {enableHtml:true})
        this.ListPayStubList = data
    },error => {
      this.toastr.error(iconApp+" une erreur c est produite !!!" , manager , {enableHtml:true});
      console.log(error);
    })
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
