import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {PositionService} from "../../PositionTools/service/position.service";
import {TaskService} from "../service/task.service";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-task-creation',
  standalone: true,
    imports: [
        FormsModule,
        NgIf,
        ReactiveFormsModule
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
  templateUrl: './task-creation.component.html',
  styleUrl: './task-creation.component.css'
})
export class TaskCreationComponent  implements OnInit{
  show: any;
   protected task =  new FormGroup({
      task_name : new FormControl('', [Validators.required]),
     task_description : new FormControl("")

});


   constructor(private service :TaskService) {}

  reloadNotification() {
        this.show = false;
  }

  createTask() {
        this.service.createTask(this.task.getRawValue()).subscribe(data => {
          console.log(data)
          this.show = true ;
        } ,error => {
          console.log(error);
        })
  }

  ngOnInit(): void {
  }
}
