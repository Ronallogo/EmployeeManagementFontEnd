import {Component, OnInit} from '@angular/core';
import {AbsenceService} from "../service/absence.service";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {EmployeeService} from "../../EmployeeTools/service/employee.service";
import {AbsenceModel2} from "../../../models/models";

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

  protected absenceForm : { date: string; reason: string; employee: number } = {
        date: "",
        reason :  "",
        employee :  0
  };
  show: boolean = false;
  show2:  boolean  = false;


  constructor(private service : AbsenceService , private employeeService : EmployeeService) {
  }

  ngOnInit(): void {
      this.employeePicked = this.employeeService.getEmployee()
      this.id = this.employeeService.getEmployee().id;
  }
  createAbsence(){
    this.service.createAbsence(this.absenceForm).subscribe(data => {
      console.log(data);
      this.show =true ;
    })
  }


  reloadNotification() {
    this.show = false ;
  }
}
