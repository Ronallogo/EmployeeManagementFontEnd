import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {iconApp, manager, PositionModel, TaskModel} from "../../../models/models";
import {PositionService} from "../../PositionTools/service/position.service";
import {TaskService} from "../service/task.service";
import {ToastrService} from "ngx-toastr";
import {NgxPaginationModule} from "ngx-pagination";
import Swal from "sweetalert2";

@Component({
  selector: 'app-task-search',
  standalone: true,
    imports: [
        FormsModule,
        NgForOf,
        RouterLink,
        RouterLinkActive,
        NgIf,
        NgxPaginationModule
    ],
  templateUrl: './task-search.component.html',
  styleUrl: './task-search.component.css'
})
export class TaskSearchComponent implements OnInit {
  protected dataSource: TaskModel[] = [] ;
  public keyword! : string
  public header = ["No" , "nom" , "description" , "actions"];
  currentPage:  number = 1;

  protected dataSource2: any[] = [] ;




  constructor(
    protected service : TaskService  ,
    private toastr : ToastrService

  ){}
  ngOnInit(): void {
  }

  searchTask(keyword : string){
    this.keyword = keyword;
    this.service.searchTask(keyword).subscribe(data => {
      this.dataSource = data ;
      console.log(data);
      if(this.dataSource.length == 0 ) this.toastr.warning(iconApp + " Aucune tache ne correspond a ce nom !! " , manager , {enableHtml:true});

    } , error => {
      console.log(error);
    });
  }

  delete(id : number){
      this.service.deleteTask(id).subscribe (data => {
        this.toastr.success(iconApp + "  Cette a été suprimée avec succès !!!"  ,manager , {enableHtml : true})
        this.service.searchTask(this.keyword).subscribe(data => {
          this.dataSource = [] ;
          if(data.length > 0)this.dataSource = data;
          else  this.toastr.info(iconApp + "  Plus aucune tache e correspond a ce mot clé !!!"  ,manager , {enableHtml : true})


        })
      })

  }


  deleteTask(id : number , Task : TaskModel){
    Swal.fire({
      title: "Voulez vous supprimé cette tache  ?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#9fec9a",
      cancelButtonColor: "#e62b2b",
      confirmButtonText: "Supprimer" ,
      cancelButtonText: "annuler" ,
      backdrop: `
    rgba(0,0,0,0.4)
    left top
    no-repeat
  ` ,
      showClass: {
        popup: `
      animate__animated
      animate__fadeInUp

    `
      },
      hideClass: {
        popup: `
      animate__animated
      animate__fadeOutDown
      animate__faster
    `
      }

    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteTask(id).subscribe(data =>{
          this.toastr.success(iconApp + " suppression reussie!!" , manager , {enableHtml:true})
          this.getAllTask();
        }  , error => {
          console.log(error);
          this.toastr.error(iconApp + " Erreur de suppression!!!" , manager , {enableHtml :true})

        })

      }

    });




  }




  getAllTask(){
    this.service.allTasks().subscribe(data => {
      this.dataSource = data ;
      console.log(data)

    } , error => {
      console.log(error) ;
    });





  }

  pageChanged($event: number) {
      this.currentPage = $event;
  }
}
