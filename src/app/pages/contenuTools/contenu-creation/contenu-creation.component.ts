
import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PositionService} from "../../PositionTools/service/position.service";
import {ContenuService} from "../service/contenu.service";
import {formatDate, NgForOf, NgIf} from "@angular/common";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-contenu-creation',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    NgForOf
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
  templateUrl: './contenu-creation.component.html',
  styleUrl: './contenu-creation.component.css'
})
export class ContenuCreationComponent implements  OnInit{

  protected contenuForm = new FormGroup({
     title  :  new  FormControl (),
     theme   : new  FormControl ()      ,
     nature  : new  FormControl (),
     language  : new  FormControl (),
     creation_date  : new  FormControl (),
     status  : new  FormControl (),
  });
  show:  boolean = false;

  constructor(private service :ContenuService) {

  }

  ngOnInit(): void {
  }

  createContenu(){


    this.contenuForm.setValue({
      title  :  this.contenuForm.getRawValue().title  ,
      theme   :  this.contenuForm.getRawValue().theme      ,
      nature  : this.contenuForm.getRawValue().nature  ,
      language  : this.contenuForm.getRawValue().language  ,
      creation_date  : formatDate(this.contenuForm.getRawValue().creation_date, 'yyyy-MM-dd', 'en-US'),
      status  : this.contenuForm.getRawValue().status,
    });


    this.service.createContenu(this.contenuForm.getRawValue()).subscribe(data =>{
      console.log(data);
      this.show = true ;
    } , error => {
      console.log(error)
    })
  }

  reloadNotification() {
      this.show = false ;
  }
}
