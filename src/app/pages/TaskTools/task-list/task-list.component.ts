import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {iconApp, manager, TaskModel} from "../../../models/models";
import {TaskService} from "../service/task.service";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-task-list',
  standalone: true,
    imports: [
        NgForOf,
        NgIf,
        RouterLink,
        RouterLinkActive
    ],

  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent  implements  OnInit{
  show: boolean = false;
  taskForNotification!: TaskModel;
  public count :number  = 0;
  protected dataSource: any[] = [] ;
  protected dataSource2: any[] = [] ;
  protected dataStatus : any[] = []
  header : string[] = ["No (ID)" , "nom" , "description" ,"status" ,  "actions"];

  constructor(protected service: TaskService , private toastr : ToastrService) {}

  ngOnInit(): void {

    this.getAllTask();

  }

  getAllTask(){
    this.service.allTasks().subscribe(data => {
      this.dataSource = data ;
      console.log(data)
      this.service.allTasksInserted().subscribe(data => {
        this.dataSource2 = data ;
        console.log(data);

        for (let i = 0; i < this.dataSource.length; i++) {
          let found = false;

          for (let j = 0; j < this.dataSource2.length; j++) {
            if (this.dataSource[i].id == this.dataSource2[j].task.id) {
              this.dataStatus.push("tâche insérée");
              found = true;
              break;
            }
          }

          if (!found) {
            this.dataStatus.push("tâche non insérée");
          }
        }



      } , error => {
        console.log(error) ;
      });

    } , error => {
      console.log(error) ;
    });





  }

  deleteTask(id : number , Task : TaskModel){
    this.service.deleteTask(id).subscribe(data =>{
      this.toastr.success(iconApp + " suppression reussie!!" , manager , {enableHtml:true})
      this.getAllTask();
    }  , error => {
      console.log(error);
      this.toastr.error(iconApp + " Erreur de suppression!!!" , manager , {enableHtml :true})

    })

  }


  generePdf(){
    this.service.report().subscribe((data : Blob) => {
      console.log(data);
      const blob = new Blob([data], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'liste_tache.pdf';
      a.click();
      URL.revokeObjectURL(url);
      this.toastr.success(iconApp+" génération réussie !! \n"+data , manager , {enableHtml:true} );
    } , error => {
      this.toastr.error(iconApp +" Erreur de génération!!!!" , manager , {enableHtml:true});
      console.log(error)
    })
  }
}
