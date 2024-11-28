import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {DatePipe, formatDate, NgClass, NgForOf, NgIf} from "@angular/common";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {TaskService} from "../../service/task.service";
import {PositionService} from "../../../PositionTools/service/position.service";
import {iconApp, manager, TaskModel} from "../../../../models/models";
import {error} from "protractor";
import {ToastrService} from "ngx-toastr";



@Component({
  selector: 'app-task-insertion-creation',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule,
    NgForOf,
    NgClass
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

  templateUrl: './task-insertion-creation.component.html',
  styleUrl: './task-insertion-creation.component.css'
})
export class TaskInsertionCreationComponent implements OnInit {
  public date  =  new Date();

  public dateFormated  =  "" ;

  taskInserted = new FormGroup({
      task : new FormControl("", [Validators.required]),
      position : new FormControl("" , [Validators.required]),
      date_insertion : new FormControl( "", [Validators.required]),
    gain_task_post : new  FormControl( 0, [Validators.required , Validators.pattern(/^\d+(\.\d{1,2})?$/)])
  });
  protected show: boolean = false;
  protected allPosition: any[] = [];
  protected allTask : any[] = []

  private formattedDate!: string;


  constructor(
    protected service :TaskService,
    protected servicePosition : PositionService ,
    private toastr : ToastrService


  ) {

  }

  createTaskInserted() {
      console.log(this.date)

    this.formattedDate = formatDate(this.date, 'yyyy-MM-dd', 'en-US');

      this.taskInserted.setValue({
        task : this.taskInserted.getRawValue().task ,
        position : this.taskInserted.getRawValue().position ,
        date_insertion : this.formattedDate    ,
        gain_task_post: this.taskInserted.getRawValue().gain_task_post
      });
      this.service.createTaskInserted(this.taskInserted.getRawValue()).subscribe(data => {
        console.log(data);
        this.toastr.success(iconApp + " Tache inserée avec succès !!" , manager ,{enableHtml : true})

      } , error =>{
        console.log(error)
        this.toastr.error(iconApp + " cette tache est déjà inserée !" , manager , {enableHtml : true})
      })
  }


  ngOnInit(): void {
      this.getAllPosition();
      this.getAllTask();
  }

  getAllPosition(){
    this.servicePosition.allPositions().subscribe(data => this.allPosition = data);
  }
  getAllTask(){
      this.service.allTasks().subscribe(data => {this.allTask = data})
  }



}
