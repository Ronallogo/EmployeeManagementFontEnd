import {Component, OnInit} from '@angular/core';
import {AbsenceService} from "../service/absence.service";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgClass, NgIf} from "@angular/common";
import {EmployeeService} from "../../EmployeeTools/service/employee.service";
import {AbsenceModel2, iconApp, manager} from "../../../models/models";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-absence-creation',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    FormsModule,
    NgClass
  ],
  templateUrl: './absence-creation.component.html',
  styleUrl: './absence-creation.component.css'
})
export class AbsenceCreationComponent implements OnInit{

  protected employeePicked : any ;
  private id : number = 0 ;
  protected absenceForm  = new FormGroup({
    absence_day: new FormControl("" ,[Validators.required]),
    reason :  new FormControl("" , [Validators.required]),
    email :  new FormControl("" , [Validators.required , Validators.email]),
  }) ;



  public icon = `<i class="nc-icon nc-chart-bar-32 "></i>`


  constructor(private service : AbsenceService , private employeeService : EmployeeService , public toastr: ToastrService) {
  }

  ngOnInit(): void {

      this.employeePicked = this.employeeService.getEmployee()
      this.id = this.employeeService.getEmployee().id;
  }
  createAbsence(){

    this.service.createAbsence({
        absence_day: String(this.absenceForm.value.absence_day),
        reason : String(this.absenceForm.value.reason) ,
        email :  String(this.absenceForm.value.email) ,
    }

    ).subscribe(data => {
      this.toastr.success(iconApp+" Cette absence   est enregistrés avec succès!!!!" , ` EMPLOYEE MANAGER` , {enableHtml : true});
    } , error => {
      console.log(error);
      this.toastr.warning(iconApp + " vérifiez que l'employé ayant cet email existe!!" , manager ,{enableHtml : true});
    })
  }


}
