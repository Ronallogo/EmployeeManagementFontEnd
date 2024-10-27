import {Component, OnInit} from '@angular/core';
import {AbsenceService} from "../service/absence.service";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {EmployeeService} from "../../EmployeeTools/service/employee.service";
import {AbsenceModel2, iconApp, manager} from "../../../models/models";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-absence-creation',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './absence-creation.component.html',
  styleUrl: './absence-creation.component.css'
})
export class AbsenceCreationComponent implements OnInit{

  protected employeePicked : any ;
  private id : number = 0 ;

  protected absenceForm : { absence_day: string; reason: string; email: string } = {
        absence_day: "",
        reason :  "",
        email :  ""
  };
  show: boolean = false;
  show2:  boolean  = false;
  public icon = `<i class="nc-icon nc-chart-bar-32 "></i>`


  constructor(private service : AbsenceService , private employeeService : EmployeeService , public toastr: ToastrService) {
  }

  ngOnInit(): void {
      this.employeePicked = this.employeeService.getEmployee()
      this.id = this.employeeService.getEmployee().id;
  }
  createAbsence(){

    this.service.createAbsence(this.absenceForm).subscribe(data => {
      this.toastr.success(iconApp+" Cette absence   est enregistrés avec succès!!!!" , ` EMPLOYEE MANAGER` , {enableHtml : true});
    } , error => {
      console.log(error);
      this.toastr.warning(iconApp + " vérifiez que l'employé ayant cet email existe!!" , manager ,{enableHtml : true});
    })
  }


}
