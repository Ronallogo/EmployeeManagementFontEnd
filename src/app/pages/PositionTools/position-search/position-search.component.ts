import {Component, OnInit} from '@angular/core';
import {NgbDropdown, NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle} from "@ng-bootstrap/ng-bootstrap";
import {PositionService} from "../service/position.service";
import {iconApp, manager, PositionModel} from "../../../models/models";
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {PositionListComponent} from "../position-list/position-list.component";
import {ToastrService} from "ngx-toastr";

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
    RouterLinkActive,
    NgIf,

  ],
  templateUrl: './position-search.component.html',
  styleUrl: './position-search.component.css'
})
export class PositionSearchComponent implements  OnInit{
  protected dataSource: PositionModel[] = [] ;
  public keyword! : string ;
  public header = ["No" , "nom" , "description" , "actions"];


  constructor(
    protected service : PositionService  ,
    private toastr : ToastrService

  ){}
  ngOnInit(): void {
  }

  searchPosition(keyword : string){
      this.service.searchPosition(keyword).subscribe(data => {
          this.dataSource = data ;
          console.log(data)
          if(data.length == 0 )this.toastr.warning(iconApp + " Aucun poste  ne correspond à ce nom !! " , manager , {enableHtml:true});

      } , error => {
        console.log(error);
        this.toastr.error(iconApp + " Une erreur est survenue !!" , manager , {enableHtml:true});
      })
  }

  deletePosition(id : number){
      let conf  = confirm("Ce poste sera supprimé");
      if(!conf)return ;

      this.service.deletePosition(id).subscribe(data =>{
        this.toastr.success(iconApp + " Suppression faite avec sccès!!!! " , manager , {enableHtml:true} );
        window.location.reload();
      }  , error => {
        console.log(error);
        this.toastr.warning(iconApp+" Une erreur est survenu lors de la suppression !!!  \n vérifiez que ce poste n'est pas affecté a un employé" , manager , {enableHtml:true})
      })


  }


}
