import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {formatDate, NgIf} from "@angular/common";
import {ContenuService} from "../service/contenu.service";
import {ContenuModel, ContenuModel2} from "../../../models/models";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-contenu-update',
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
  templateUrl: './contenu-update.component.html',
  styleUrl: './contenu-update.component.css'
})
export class ContenuUpdateComponent  implements OnInit{
  protected contenuFecth! : ContenuModel ;
  private id = 0
  protected contenuForm = new FormGroup({
    title  :  new  FormControl (),
    theme   : new  FormControl ()      ,
    nature  : new  FormControl (),
    language  : new  FormControl (),
    creation_date  : new  FormControl (),
    status  : new  FormControl (),
  });
  show:  boolean = false ;


  constructor(private service : ContenuService) {
  }

  ngOnInit(): void {
      this.initialize()
  }

  updateContenu() {
    this.contenuForm.setValue({
      title  :  this.contenuForm.getRawValue().title  ,
      theme   :  this.contenuForm.getRawValue().theme      ,
      nature  : this.contenuForm.getRawValue().nature  ,
      language  : this.contenuForm.getRawValue().language  ,
      creation_date  : formatDate(this.contenuForm.getRawValue().creation_date, 'yyyy-MM-dd', 'en-US'),
      status  : this.contenuForm.getRawValue().status,
    });

    this.service.updateContenu(this.id , this.contenuForm.getRawValue()).subscribe(data =>{
      console.log(data);
      this.show  = true ;
    } , error => {
      console.log(error);
    })
  }

  initialize(){
    this.contenuFecth = this.service.getContenu();
    console.log(this.contenuFecth)


    this.id = this.contenuFecth.id;

    this.contenuForm.setValue({
      nature: this.contenuFecth.nature,
      theme: this.contenuFecth.theme,
      title: this.contenuFecth.title,
      language: this.contenuFecth.language,
      creation_date: formatDate(this.contenuFecth.creation_date, 'yyyy-MM-dd', 'en-US'),
      status: this.contenuFecth.status
    });



    console.log(this.contenuForm.getRawValue());





  }

  reloadNotification() {
    this.show = false ;
  }
}
