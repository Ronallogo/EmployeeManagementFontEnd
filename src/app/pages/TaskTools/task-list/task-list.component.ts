import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {TaskModel } from "../../../models/models";
import {TaskService} from "../service/task.service";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-task-list',
  standalone: true,
    imports: [
        NgForOf,
        NgIf,
        RouterLink,
        RouterLinkActive
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
  header : string[] = ["No" , "nom" , "description" ,"status" ,  "actions"];

  constructor(protected service: TaskService) {}

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
        console.log(this.dataStatus)


      } , error => {
        console.log(error) ;
      });

    } , error => {
      console.log(error) ;
    });





  }

  deleteTask(id : number , Task : TaskModel){
    this.service.deleteTask(id).subscribe(data =>{
      this.show = false;
      console.log(this.show)
      window.location.reload();

    }  , error => {
      console.log(error);
      this.show = true ;
      this.taskForNotification = Task ;
    })

  }


  reloadNotification() {
      this.show = false ;
  }
}
