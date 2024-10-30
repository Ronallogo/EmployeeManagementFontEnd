import {Component, OnInit} from '@angular/core';
import {DemandeConge, DemandeConge2, iconApp, manager} from "../../../../models/models";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {UserSettingService} from "../../service/user-setting.service";
import {EmployeeService} from "../../../EmployeeTools/service/employee.service";
import {ToastrService} from "ngx-toastr";




@Component({
  selector: 'app-user-demande-conge',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgForOf,
    NgClass,
    NgIf
  ],
  templateUrl: './user-demande-conge.component.html',
  styleUrl: './user-demande-conge.component.css'
})
export class UserDemandeCongeComponent  implements OnInit {



  protected demandeConge = new FormGroup({
    beginning : new FormControl("" , [Validators.required]),
    end : new FormControl("" , [Validators.required]),
    type : new FormControl("" , [Validators.required]),
    employee  : new FormControl("" ),
    validate : new FormControl(""),
    apply : new FormControl("" , [Validators.required])
  });

  protected  type : string[] = [
    "Congé payé",
    "Congé maladie",
    "Congé maternité",
    "Congé paternité",
    "Congé parental",
    "Congé pour événement familial",
    "Congé sabbatique",
    "Congé pour études",
    "Congé pour raison personnelle",
    "Congé de bénévolat" ,
    "Autres"
  ];
  private email : string = "";
  private id = 0  ;


  constructor(private  service : UserSettingService , private employeeService : EmployeeService , private toastr : ToastrService) {
  }

  getEmployee(){


    this.employeeService.getEmployeeByEmail(this.email).subscribe(data =>{
      console.log(data)
      this.id = data.id
    } , error => {
      console.log(error);
    })
  }

  ngOnInit(): void {
    console.log(this.type);
    this.email = JSON.parse(String(localStorage.getItem("user"))).email;
    this.getEmployee()

  }




  createDemande(){


    this.service.createDemandeConge( {
      beginning :  String(this.demandeConge.value.beginning),
      end :String(this.demandeConge.value.end),
      apply : String(this.demandeConge.value.apply) ,
      validate: false,
      type:String(this.demandeConge.value.apply),
      employee :  this.id
    }).subscribe(data =>{

      this.toastr.success(iconApp + " Demande envoyé !!" , manager , {enableHtml : true});

    } , error => {
      console.log(error);
      this.toastr.error(iconApp + " Demande non envoyé !!" , manager , {enableHtml:true})
    })
  }
}




