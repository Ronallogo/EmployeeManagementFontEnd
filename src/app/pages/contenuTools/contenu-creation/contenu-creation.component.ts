
import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {PositionService} from "../../PositionTools/service/position.service";
import {ContenuService} from "../service/contenu.service";
import {formatDate, NgClass, NgForOf, NgIf} from "@angular/common";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {ToastrService} from "ngx-toastr";
import {iconApp, manager} from "../../../models/models";

@Component({
  selector: 'app-contenu-creation',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgIf,
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
  templateUrl: './contenu-creation.component.html',
  styleUrl: './contenu-creation.component.css'
})
export class ContenuCreationComponent implements  OnInit{

  protected contenuForm = new FormGroup({
     title  :  new  FormControl ("" , [Validators.required]),
     theme   : new  FormControl ("" , Validators.required)      ,
     nature  : new  FormControl ("" , Validators.required),
     language  : new  FormControl ("" , Validators.required),
     creation_date  : new  FormControl ("" , Validators.required),
     status  : new  FormControl ("" , Validators.required),
  });


  constructor(private service :ContenuService , private toastr : ToastrService) {

  }

  ngOnInit(): void {
  }

  createContenu(){


    this.contenuForm.setValue({
      title  :  this.contenuForm.getRawValue().title  ,
      theme   :  this.contenuForm.getRawValue().theme      ,
      nature  : this.contenuForm.getRawValue().nature  ,
      language  : this.contenuForm.getRawValue().language  ,
      creation_date  : formatDate(String(this.contenuForm.getRawValue().creation_date), 'yyyy-MM-dd', 'en-US'),
      status  : this.contenuForm.getRawValue().status,
    });


    this.service.createContenu(this.contenuForm.getRawValue()).subscribe(data =>{
      console.log(data);
      this.toastr.success(iconApp+ " Contenu enregistré avec succès !!" , manager , { enableHtml : true})

    } , error => {
      console.log(error);
      this.toastr.error(iconApp+ "  Une erreur es survenue lors de l'enregistrement !!" , manager , { enableHtml : true})

    })
  }


}
