import {Component, OnInit} from '@angular/core';
import {ContenuService} from "../service/contenu.service";
import {ContenuModel} from "../../../models/models";
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";

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
  constructor(protected service : ContenuService) {
  }

  ngOnInit(): void {
  }

  searchContenu(keyword: string){
      this.service.searchContenu(keyword).subscribe (data => {
          this.contenuPicked = data;
      } , error => {
        console.log(error);
      })
  }
  deleteContenu(id:number) {
    this.service.deleteContenu(id).subscribe (data => {
      console.log(data);
      window.location.reload();
    } , error => {
      console.log(error);
    })
  }
}
