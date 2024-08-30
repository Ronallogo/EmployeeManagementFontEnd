import {Component, Injector, OnInit} from '@angular/core';

import {count, Observable} from "rxjs";
import {PositionService} from "../service/position.service";
import {iconApp, manager, PositionModel} from "../../../models/models";
import {NgForOf, NgIf} from "@angular/common";
import {NgbDropdownToggle} from "@ng-bootstrap/ng-bootstrap";
import {RouterLink, RouterLinkActive, RouterModule} from "@angular/router";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'app-position-list',
  standalone: true,
  imports: [
    NgForOf,
    NgbDropdownToggle,
    RouterLink,
    RouterLinkActive,
    NgIf
  ],
  animations: [
    trigger('slideInOut', [
      state('in', style({ transform: 'translateX(0)' })),
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('800ms ease-in')
      ]),
      transition(':leave', [
        animate('800ms ease-in', style({ transform: 'translateX(100%)' }))
      ])
    ])
  ] ,
  templateUrl: './position-list.component.html',
  styleUrl: './position-list.component.css'
})
export class PositionListComponent implements  OnInit{
  protected dataSource: any[] = [] ;
  show: boolean = false;



  positionForNotification! : PositionModel;

  public header = ["No" , "nom" , "description" , "actions"];
  constructor(
    protected service : PositionService ,
    private  toastr  : ToastrService
  ) {
  }



  ngOnInit(): void {
      this.getAllPosition()
  }

  getAllPosition(){
    this.service.allPositions().subscribe(data => {
      this.dataSource = data ;

    } , error => {
      console.log(error) ;
      this.toastr.error(iconApp + " Une erreur de chargement des données!!!",manager , {enableHtml:true} );
    });
  }

  deletePosition(id : number , position : PositionModel){
       this.service.deletePosition(id).subscribe(data =>{
          this.toastr.success(iconApp + " Suppression faite avec sccès!!!!" , manager , {enableHtml:true} );
          window.location.reload();

      }  , error => {
         console.log(error);
        this.toastr.error(iconApp+" Une erreur esyt subvenu lors de la suppression!!!" , manager , {enableHtml:true})
       })

  }




  /*counter(count : number) : number{
      if (this.endCount >= this.count) return this.counter(count) +  1 ;
  }*/

}
