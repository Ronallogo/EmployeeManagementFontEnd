import {Component, OnInit} from '@angular/core';
import {NgbDropdown, NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle} from "@ng-bootstrap/ng-bootstrap";
import {PositionService} from "../service/position.service";
import {PositionModel} from "../../../models/models";
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {PositionListComponent} from "../position-list/position-list.component";

@Component({
  selector: 'app-position-search',
  standalone: true,

  imports: [
    NgbDropdown,
    NgbDropdownItem,
    NgbDropdownMenu,
    NgbDropdownToggle,
    FormsModule,
    NgForOf,
    RouterLink,
    RouterLinkActive ,

  ],
  templateUrl: './position-search.component.html',
  styleUrl: './position-search.component.css'
})
export class PositionSearchComponent implements  OnInit{
  protected dataSource: PositionModel[] = [] ;
  public keyword! : string
  public header = ["No" , "nom" , "description" , "actions"];


  constructor(
    protected service : PositionService  ,

  ){}
  ngOnInit(): void {
  }

  searchPosition(keyword : string){
      this.service.searchPosition(keyword).subscribe(data => {
          this.dataSource = data ;
          console.log(data)

      } , error => {
        console.log(error);
      })
  }


}
