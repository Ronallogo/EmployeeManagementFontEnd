import {Component, OnInit} from '@angular/core';
import {CongeService} from "../service/conge.service";
import {NgForOf, NgIf} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";

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

  constructor(protected service : CongeService ){ }


  ngOnInit(): void {
    this.allConge();
  }


  deleteConge(id : number) {

    this.service.deleteConge(id).subscribe(data =>{
      console.log(data);
    })
  }

  allConge(){
    this.service.allConges().subscribe(data =>{
      console.log(data);
      this.listConge = data;
    } , error => {
      console.log(error);

    })
  }
}
