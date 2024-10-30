import {Component, OnInit} from '@angular/core';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {
  ContenuModel,
  iconApp,
  manager,
  TaskInsertedModel,
  TaskInsertedModel2,
  TaskScheduled2
} from "../../../../models/models";
import {TaskService} from "../../service/task.service";
import {NavigationStart, Router, RouterLink, RouterLinkActive} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {ContenuService} from "../../../contenuTools/service/contenu.service";

@Component({
  selector: 'app-task-scheduled-update',
  standalone: true,
  imports: [
    NgForOf,
    ReactiveFormsModule,
    NgClass,
    FormsModule,
    NgIf,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './task-scheduled-update.component.html',
  styleUrl: './task-scheduled-update.component.css'
})
export class TaskScheduledUpdateComponent  implements OnInit{

  protected task  !: TaskScheduled2 ;

  listContent:  ContenuModel[] = [];
  ListTaskInserted:   any[] = [];

  protected taskScheduled_2 =  new FormGroup({
    content: new  FormControl(   ),
    taskInserted:  new  FormControl( ),
    beginning:  new  FormControl(  ),
    end:  new  FormControl( ) ,
    type : new FormControl( ),
    nbrPerson : new FormControl(  ),
  });



  constructor(private serviceContent : ContenuService ,  private service : TaskService  , private  router :Router , private toastr : ToastrService) {
  }





  ngOnInit(): void {
    this.task = this.service.getTaskScheduled()
    if (this.task == undefined) {
      window.location.replace("http://localhost:4200/#/task-scheduled-search")
    }
    console.log(this.task)
    this.taskScheduled_2.patchValue(this.task)
    this.getData(this.task.taskInserted.position.id);

  }

  getData(position : number){
    this.service.allTasksInsertedForOnePosition(position).subscribe(data =>{
      this.ListTaskInserted = data ;
    }, error => {
      this.toastr.warning(iconApp+"Erreur de chargement de tache" , manager , {enableHtml:true});
    });
    this.serviceContent.allContenu().subscribe(data =>{
        this.listContent = data ;
    } , error => {
      this.toastr.warning(iconApp+"Erreur de chargement des  contenus" , manager , {enableHtml:true});
    })

  }

  UpdateTaskScheduled() {
      console.log(this.taskScheduled_2.value)
      this.service.updateTaskScheduled(this.task.id , {
        beginning:  String(this.taskScheduled_2.value.beginning ),
        end:  String(this.taskScheduled_2.value.end ),
        type: String(this.task.type),
        nbrPerson :Number( this.taskScheduled_2.value.nbrPerson) ,
        content : this.taskScheduled_2.value.content,
        taskInserted  : this.taskScheduled_2.value.taskInserted,


      }).subscribe(data =>{
        console.log(data)
      })

  }
}
