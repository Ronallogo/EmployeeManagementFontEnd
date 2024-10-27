import {Component, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {EmployeeService} from "../service/employee.service";
import {PositionService} from "../../PositionTools/service/position.service";
import {NgForOf, NgIf} from "@angular/common";
import {PayStubService} from "../../payStubTools/service/pay-stub.service";
import {ToastrService} from "ngx-toastr";
import {getTodayDate, iconApp, manager, UserDetails} from "../../../models/models";
import {NotificationService} from "../../notification/notification/notification.service";



@Component({
  selector: 'app-employee-creation',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf,
    NgIf,
    FormsModule
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
  private user !:UserDetails;

  protected date_insertion : string = "";
  private selectedFile: any;

  constructor(
    private employeeService: EmployeeService ,
    private positionService : PositionService ,
    private payStubService : PayStubService,
    private  notify : NotificationService ,

    private toastr :ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllPosition() ;
  }


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

    const userData = {
      firstname: this.Employee.getRawValue().name,
      lastname: this.Employee.getRawValue().surname,
      email: this.Employee.getRawValue().email,
      password: this.Employee.getRawValue().password,
      role: "USER"
    };


    if( this.Employee.getRawValue().password == this.Employee.getRawValue().confirmPassword ){
      this.employeeService.registerUser(userData).subscribe(data =>{
        console.log(data);
        if(this.selectedFile == undefined) this.selectedFile =  new File([], "", {type: 'application/octet-stream'})
        this.employeeService.createEmployee(this.Employee.getRawValue() , this.selectedFile).subscribe(data => {
          console.log(data);
          this.toastr.success(iconApp+ " Employee crée avec succès !",manager , {enableHtml:true})


          this.payStubService.createPayStub({
            amount : 0 ,
            nbrTasks : 0,
            bonus : 0 ,
            paymentDate : this.date_insertion,
            employee : data.id
          }).subscribe(data =>{
            this.toastr.info(iconApp+ " Cet employé possède désormais un bulletin de paie !",manager , {enableHtml:true})
            console.log(data);
          },error => {
            console.log(error);
            this.toastr.warning(iconApp+ " Cet employé ne possède pas de bulletin de paie !",manager , {enableHtml:true})
          });


          console.log(Date.now().toString())

          this.notify.create({
            message : " Bienvenue dans votre interface user  @"+data.name+" !!",
            employee : data.id ,
            date : getTodayDate(),
            type : "création"
          }).subscribe( data =>{
            console.log(data);
          } , error => {
            console.log(error);
          })





        } , error => {
          console.log(error);

        })
      })
    }
    else{
        this.toastr.warning(iconApp+ " Les mots de passes ne sont pas identiques !!",manager , {enableHtml:true})

    }

  }



  getAllPosition(){
    this.positionService.allPositions().subscribe(data =>{
        this.allPosition = data;
        console.log(data)

    } , error => {
        console.log(error);
    })
  }



  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
}
