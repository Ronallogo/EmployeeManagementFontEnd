import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {iconApp, manager, PositionModel, TaskInsertedModel2, TaskModel} from "../../../../models/models";
import {TaskService} from "../../service/task.service";
import {PositionService} from "../../../PositionTools/service/position.service";
import {ToastrService} from "ngx-toastr";
import {NgxPaginationModule} from "ngx-pagination";
import Swal from "sweetalert2";

@Component({
  selector: 'app-task-insertion-list',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    RouterLink,
    RouterLinkActive,
    NgxPaginationModule
  ],
  templateUrl: './task-insertion-list.component.html',
  styleUrl: './task-insertion-list.component.css'
})
export class TaskInsertionListComponent  implements  OnInit{
  show: boolean = false;

  header:  string[]=["No" , "tache" , "poste" , "date d'insertion" , "gain unitaire" , "actions"];
  taskInsertedModels: any[] = [];
  taskModels : any[]  = [];
  positionModels : any[] =[];
  currentPage:  number = 1 ;
  constructor(
    protected service : TaskService ,
    protected PositionService : PositionService ,
    private toastr :ToastrService ,
  ) {
  }




  getAllTaskInserted(){
    this.service.allTasksInserted().subscribe(data =>{
        this.taskInsertedModels = data;

        if(data.length == 0) this.toastr.warning(iconApp + " Aucune tache insérée n'a ce nom!!" , manager  , {enableHtml : true})
        this.service.allTasks().subscribe(data2 =>{
          this.taskModels = data2;
          console.log(data2);
          this.PositionService.allPositions().subscribe(data3 =>{
            this.positionModels = data3;

          })
        })

    })
  }

  ngOnInit(): void {
    this.getAllTaskInserted();
  }


  deleteTaskInserted(t :any){



    Swal.fire({
      title: "Voulez vous retiré cette tache  ?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#9fec9a",
      cancelButtonColor: "#e62b2b",
      confirmButtonText: "retirer" ,
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
        this.service.deleteTaskInserted(t.id).subscribe(data =>{
          console.log(data);
          this.toastr.success(iconApp + " suppression faite avec succès" , manager , {enableHtml : true})
          this.getAllTaskInserted()
        } ,error => {
          console.log(error);
          this.toastr.error(iconApp  + " Erreur de suppression !!" , manager , {enableHtml:true})
        })

      }

    });


  }





  generePdf(){
    this.service.report2().subscribe((data : Blob) => {
      console.log(data);
      const blob = new Blob([data], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'liste_tache_insérées.pdf';
      a.click();
      URL.revokeObjectURL(url);
      this.toastr.success(iconApp+" génération réussie !! \n"+data , manager , {enableHtml:true} );
    } , error => {
      this.toastr.error(iconApp +" Erreur de génération!!!!" , manager , {enableHtml:true});
      console.log(error)
    })
  }

  pageChanged($event: number) {
      this.currentPage = $event
  }
}
