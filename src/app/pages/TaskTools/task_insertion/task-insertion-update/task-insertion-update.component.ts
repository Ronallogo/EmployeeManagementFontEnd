import {Component, OnInit} from '@angular/core';
import {formatDate, NgForOf, NgIf} from "@angular/common";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {iconApp, manager, TaskInsertedModel2, TaskModel} from "../../../../models/models";
import {TaskService} from "../../service/task.service";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {PositionService} from "../../../PositionTools/service/position.service";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-task-insertion-update',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    FormsModule,
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
  templateUrl: './task-insertion-update.component.html',
  styleUrl: './task-insertion-update.component.css'
})
export class TaskInsertionUpdateComponent implements OnInit {
  show: boolean = false;
  public date  =  new Date();
  public id! : number ;
  formulaire = new FormGroup({
    task : new FormControl(0, [Validators.required]),
    position : new FormControl(0 , [Validators.required]),
    date_insertion : new FormControl( ),
    gain_task_post : new  FormControl(0)
  });

  public task!: TaskInsertedModel2 ;
  public allPosition:  any[] = [];
  public allTask : any[] = [ ];
  private formattedDate!: string;
  show2: boolean = false;





  constructor(
    protected service :TaskService ,
    protected Positions : PositionService,
    private toastr : ToastrService
  ) {
  }


  reloadNotification() {
    this.show = false ;
    this.show2 = false ;
  }

  ngOnInit(): void {
    this.initialize()

  }

  initialize(){
    this.task = this.service.getTaskInserted();
    console.log(this.task);

    this.service.allTasks().subscribe(data => this.allTask = data);
    this.Positions.allPositions().subscribe(data => this.allPosition =data  );
    let   formattedDate = this.task.date ? formatDate(this.task.date, 'yyyy-MM-dd', 'en-US') : '';

    this.formulaire.setValue(
      {
        task : this.task.task ,
        position: this.task.position ,
        gain_task_post : this.task.gain ,
        date_insertion : formattedDate

      }
    )

    console.log( "formulaire apres initialisation :" + this.formulaire.getRawValue())
  }



  updateTaskInserted(){


    this.formulaire.setValue(
      {
        task : this.formulaire.getRawValue().task ,
        position: this.formulaire.getRawValue().position ,
        gain_task_post : this.formulaire.getRawValue().gain_task_post ,
        date_insertion :  formatDate(this.formulaire.getRawValue().date_insertion, 'yyyy-MM-dd', 'en-US')

      } )
    this.id = this.task.id;
    console.log(this.formulaire.getRawValue().date_insertion);
    console.log("formulaire apres saisie du user :" + this.formulaire.getRawValue());
    this.service.updateTaskInserted(this.id, this.formulaire.getRawValue()).subscribe(data =>{
      console.log(data);
      this.toastr.success(iconApp + " Mise à jour effectuée avec succès !!!" , manager , {enableHtml : true})
    } , error => {
      console.log(error);
      this.toastr.warning(iconApp+" Cette tache est déjà insérée !!!" , manager , {enableHtml:true})
    })
  }




}
