import {Component, OnInit} from '@angular/core';
import {ContenuService} from "../service/contenu.service";
import {ContenuModel, iconApp, manager} from "../../../models/models";
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-contenu-search',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './contenu-search.component.html',
  styleUrl: './contenu-search.component.css'
})
export class ContenuSearchComponent implements OnInit{
  public keyword : string = "";

  protected contenuPicked: ContenuModel[] = [] ;

  protected  header = ["No" , "Titre" , "Thème" , "Nature" , "Langue" , "Date de création" , "status" , "Actions"]
  constructor(protected service : ContenuService , private toastr : ToastrService) {
  }

  ngOnInit(): void {
  }

  searchContenu(keyword: string){
      this.service.searchContenu(keyword).subscribe (data => {
          this.contenuPicked = data;
          if(data.length == 0 ) this.toastr.warning(iconApp + " Aucun contenu ne correspond a ce mot clé !! " , manager , {enableHtml:true});
      } , error => {
        console.log(error);
      })
  }
  deleteContenu(id:number) {
    let conf = confirm("Ce contenu sera supprimer !!")
    if(conf) return ;
    this.service.deleteContenu(id).subscribe (data => {
      console.log(data);
      window.location.reload();
    } , error => {
      console.log(error);
    })
  }
}
