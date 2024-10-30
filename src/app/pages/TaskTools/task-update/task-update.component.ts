import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {TaskService} from "../service/task.service";
import {iconApp, manager, TaskModel} from "../../../models/models";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-task-update',
  standalone: true,
    imports: [
        FormsModule,
        NgIf,
        ReactiveFormsModule,
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
  templateUrl: './task-update.component.html',
  styleUrl: './task-update.component.css'
})
export class TaskUpdateComponent implements OnInit{
  show: boolean = false;
  public id! : number ;
  formulaire = new  FormGroup({
      task_name : new FormControl(),
    task_description : new FormControl()
  });

  public task!: TaskModel ;

  constructor(protected service :TaskService , private toastr : ToastrService) {
  }



  ngOnInit(): void {
    this.initialize()

  }

  initialize(){
    this.task = this.service.getTask();

    this.formulaire.setValue(
      {
        task_name : this.task.task_name ,
        task_description: this.task.task_description ,

      }
    )
    this.id = this.task.id

  }

  updateTask(){
    this.service.updateTask(this.id, {...this.formulaire.getRawValue()}).subscribe(data =>{
        this.toastr.success(iconApp+"Cette tache a été enregistré avec succès!!" , manager ,  {enableHtml:true})

    } , error => {
      console.log(error);
      this.toastr.info(iconApp+"une erreru est survenu" , manager ,{enableHtml:true})
    })
  }
}
