import {Component, OnInit} from '@angular/core';
import {PayStubService} from "../service/pay-stub.service";
import {iconApp, manager, PayStubModel2} from "../../../models/models";
import {ToastrService} from "ngx-toastr";
import {NgForOf, NgIf} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-pay-stub-list',
  standalone: true,
    imports: [
        NgForOf,
        RouterLink,
        RouterLinkActive,
        NgIf
    ],
  templateUrl: './pay-stub-list.component.html',
  styleUrl: './pay-stub-list.component.css'
})
export class PayStubListComponent implements OnInit{
  protected ListPayStubList:  PayStubModel2[]  = [];
  header: string[] = ["No"  , "Nom de l'employé" , "nombre de tache faites" , "bonus reçu" , "date de création du bulletin" , "montant" , "actions"]  ;

  constructor(
    protected service : PayStubService ,
    private toastr : ToastrService ,
  ) {}
  ngOnInit(): void {
    this.getAllPayStub();
  }


  getAllPayStub(){
    this.service.allPayStubs().subscribe(data => {
        console.log(data)
        this.ListPayStubList = data ;
    } , error => {
          console.log(error);
          this.toastr.warning(iconApp+"la liste des bulletins de paie n ' pas chargée !!" , manager , {enableHtml:true} );
    })

  }

  deletePayStub(id: number) {

    let conf = confirm("voulez vous vraiment supprimer?? ");
    if(!conf) return  ;
    this.service.deletePayStub(id).subscribe(data =>{
      console.log(data);
      this.toastr.success(iconApp+" le bulletin de paie a été supprimé" , manager , {enableHtml:true})
    },error => {
      console.log(error);
      this.toastr.error(iconApp+" le bulletin n'a pas pu etre supprimer !!" , manager , {enableHtml:true})
    })
  }
}
