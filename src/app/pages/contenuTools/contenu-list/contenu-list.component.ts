import {Component, OnInit} from '@angular/core';
import {PositionService} from "../../PositionTools/service/position.service";
import {ContenuService} from "../service/contenu.service";
import {NgForOf, NgIf} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {ContenuModel, ContenuModel2} from "../../../models/models";

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

  constructor(protected service : ContenuService ) {}


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
      } , error => {
        console.log(error);
      })
  }
}
