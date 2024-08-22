import {Component, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {EmployeeService} from "../service/employee.service";
import {PositionService} from "../../PositionTools/service/position.service";
import {NgForOf, NgIf} from "@angular/common";



@Component({
  selector: 'app-employee-creation',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf,
    NgIf
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
  templateUrl:  './employee-creation.component.html',
  styleUrl: './employee-creation.component.css'
})
export class EmployeeCreationComponent implements  OnInit{

  protected allPosition : any[] = []




  protected Employee = new FormGroup({
      name : new FormControl() ,
      surname : new FormControl() ,
      email : new FormControl() ,
      birthday : new FormControl() ,
      phone : new FormControl() ,
      password: new FormControl() ,
      confirmPassword: new FormControl() ,
      address : new FormControl() ,
      position : new FormControl()

  } );
  show:  boolean = false;
  show2: boolean = false;

  createEmployee(){
    console.log(this.Employee.getRawValue().password  , " ", this.Employee.getRawValue().confirmPassword)
    console.log(this.Employee.getRawValue())
    if( this.Employee.getRawValue().password == this.Employee.getRawValue().confirmPassword ){
      this.employeeService.createEmployee(this.Employee.getRawValue()).subscribe(data => {
        console.log(data);
        this.show = true ;
        this.show2 = false
      } , error => {
        console.log(error);

      })
    }
    else{
      this.show2 = true ;

    }

  }



  constructor(private employeeService: EmployeeService , private positionService : PositionService) {}

  ngOnInit(): void {
    this.getAllPosition() ;
  }

  getAllPosition(){
    this.positionService.allPositions().subscribe(data =>{
        this.allPosition = data;
        console.log(data)

    } , error => {
        console.log(error);
    })
  }

  reloadNotification() {
    this.show =false ;
    this.show2 =false;
  }
}
