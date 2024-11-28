import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {iconApp, manager, TaskScheduled, TaskScheduled2} from "../../../../models/models";
import {TaskService} from "../../service/task.service";
import {ToastrService} from "ngx-toastr";
import {NgxPaginationModule} from "ngx-pagination";

@Component({
  selector: 'app-list-task-scheduled',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    NgxPaginationModule
  ],
  templateUrl: './list-task-scheduled.component.html',
  styleUrl: './list-task-scheduled.component.css'
})
export class  ListTaskScheduledComponent implements  OnInit{
  protected header :  string[]  = ["No" , "Nom dela tache" , "contenu" , "Début de tache" , "Fin de la tache"    , "status", "Actions"];
  protected listTaskScheduled : TaskScheduled2[] = [];
  protected validate:  boolean = false;
  protected currentPage: number = 1 ;

  constructor(
    private service : TaskService ,
    private toastr : ToastrService ,
  ) {
  }


  ngOnInit(): void {
    this.getData()
  }


  getData(){
      this.service.AllTaskScheduled().subscribe(data =>{
          console.log(data);
          this.listTaskScheduled  = data ;
      } , error => {
        console.log(error);
        this.toastr.error(iconApp + " Erreur de chargement de donnée " , manager , {enableHtml : true});
      })
  }

  validateTask(){

  }

  deleteTask(id: number) {
    this.service.deleteTaskScheduled(id).subscribe(data =>{
     this.getData();
     this.toastr.success(iconApp + "Cette n'est plus planifiée !!" , manager , {enableHtml : true})

    } , error => {
      console.log(error);
      this.toastr.error(iconApp + " Erreur de supression!!" , manager , {enableHtml :true})
    })
  }

  validateFunction(p: TaskScheduled2) {
      p.status = true ;
      let id = p.id
      this.service.updateTaskScheduled(id , p).subscribe(data =>{
        console.log(data);
        this.toastr.success(iconApp + "  Validation de tache réussie!!!" , manager , {enableHtml :true})
      } , error => {
        console.log(error);
        this.toastr.error(iconApp + " Erreur de validation"  , manager , {enableHtml :true})
      })
  }


  generedPdf(){
    this.service.report3().subscribe((data : Blob) => {
      console.log(data);
      const blob = new Blob([data], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'liste_tache_programées.pdf';
      a.click();
      URL.revokeObjectURL(url);
      this.toastr.success(iconApp+" génération réussie !! \n"+data , manager , {enableHtml:true} );
    } , error => {
      this.toastr.error(iconApp +" Erreur de génération!!!!" , manager , {enableHtml:true});
      console.log(error)
    })
  }
}
