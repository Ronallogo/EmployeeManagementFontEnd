import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {TaskService} from "../service/task.service";
import {TaskModel} from "../../../models/models";
import {animate, state, style, transition, trigger} from "@angular/animations";

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

  constructor(protected service :TaskService) {
  }


  reloadNotification() {
      this.show = false ;
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

    console.log(this.task)
  }

  updateTask(){
    this.service.updateTask(this.id, {...this.formulaire.getRawValue()}).subscribe(data =>{
      console.log(data);
      this.show = true ;
    } , error => {
      console.log(error);
    })
  }
}
