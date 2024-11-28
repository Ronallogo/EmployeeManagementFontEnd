import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {CongeService} from "../service/conge.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CongeModel, iconApp, manager} from "../../../models/models";
import {ToastrService} from "ngx-toastr";
import {NgxPaginationModule} from "ngx-pagination";

@Component({
  selector: 'app-search-conge',
  standalone: true,
    imports: [
        NgForOf,
        NgIf,
        RouterLink,
        RouterLinkActive,
        FormsModule,
        ReactiveFormsModule,
        NgxPaginationModule
    ],
  templateUrl: './search-conge.component.html',
  styleUrl: './search-conge.component.css'
})
export class SearchCongeComponent implements OnInit {

  protected listConge :  any[] =  [];
  public keyword! : number ;
  protected header : string[] = ["No" , "début de congé" , "fin de congé" , "type de congé" , "status" , "demande de" , "actions"]
  protected currentPage: number = 1;

  constructor(protected service : CongeService , private toastr : ToastrService){}

  ngOnInit(): void {}

  searchConge(keyword : number){
    this.listConge = [];
    this.keyword = keyword ;
    if(keyword == null){
        this.toastr.warning(iconApp + "Aucun employé ayant cet identifiant ne beneficie d'un congé" , manager , {enableHtml:true})
        return;
    }
    this.service.searchCongeById(keyword).subscribe(data => {

      if(data.length > 0) data.forEach((item) => {this.listConge.push(item);});
      else this.toastr.warning(iconApp + "Aucun employé ayant cet identifiant ne beneficie d'un congé" , manager , {enableHtml:true})
    } , error => {
      console.log(error);
    })
  }


  deleteConge(c : any) {
    let conf = confirm("Ce congé sera supprimée");
    if(!conf)return;
    this.service.deleteConge(c.id).subscribe(data =>{
        this.toastr.success(iconApp+"Ce congé a été supprimé avec succès!!" , manager , {enableHtml : true});
        this.service.searchCongeById(this.keyword).subscribe(data =>{
          this.listConge = [];
          if(data.length > 0) data.forEach((item) => {this.listConge.push(item);});
          else  this.toastr.info(iconApp + "  Cet employé n'a plus de congé enregistré!!!"  ,manager , {enableHtml : true})


        })
    });
  }

  pageChanged($event: number) {
      this.currentPage = $event ;
  }
}
