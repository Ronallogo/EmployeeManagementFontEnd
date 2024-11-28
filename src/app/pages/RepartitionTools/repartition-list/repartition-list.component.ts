import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {NgForOf, NgIf} from "@angular/common";
import {RepartitionService} from "../repartition/repartition.service";
import {ToastrService} from "ngx-toastr";
import {iconApp, manager, repartition} from "../../../models/models";
import {NgxPaginationModule} from "ngx-pagination";

@Component({
  selector: 'app-repartition-list',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    NgForOf,
    NgIf,
    RouterOutlet,
    NgxPaginationModule
  ],
  templateUrl: './repartition-list.component.html',
  styleUrl: './repartition-list.component.css'
})
export class RepartitionListComponent implements OnInit{
  header:  string[] = ["Photo","Nom","Email","Poste","Role"];

  protected listRepartition : repartition[] = [];
  views:  boolean = false;
  currentPage: number = 1;

  constructor(private service : RepartitionService , private toastr : ToastrService){}

  ngOnInit(): void {
      this.getAllRepartition()
  }
  deleteEmployeeFromRepartition(id : number){
      this.service.deleteEmployeeFromRepartition(id).subscribe(data =>{
          this.getAllRepartition();
          this.setViews()
          this.toastr.success(iconApp+"Cet employé a été retiré de la tache avec succès!!!" , manager , {enableHtml : true});

      } , error => {
        console.log(error);
      })
  }

  getAllRepartition(){
      setTimeout(()=>{
        this.setViews()
      } , 2000)
      this.service.allRepartition().subscribe(data => {
        console.log(data)
        this.listRepartition = data

      } , error => {
        console.log(error)
        this.toastr.warning(iconApp+"Erreur de chargement des repartition" , manager , {enableHtml:true} );
      })
  }

  getImageUrl(photo: any) {
    return `data:image/jpg;base64,${photo}`;
  }
  setViews(){
    this.views = !this.views;
  }

  pageChanged($event: number) {
      this.currentPage = $event ;
  }

}
