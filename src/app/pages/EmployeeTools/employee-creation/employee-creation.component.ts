import {Component, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {EmailValidator, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {EmployeeService} from "../service/employee.service";
import {PositionService} from "../../PositionTools/service/position.service";
import {NgClass, NgForOf, NgIf} from "@angular/common";
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
    FormsModule,
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
  name : new FormControl(String("") ,[ Validators.required  , Validators.minLength(2)]  ) ,
  surname : new FormControl(String("") , [Validators.required , Validators.minLength(2)] ) ,
  email : new FormControl("", [ Validators.required , Validators.email ]  ) ,
  birthday : new FormControl(String("") , Validators.required  ) ,
  phone : new FormControl(String("exemple : 78954156") , [Validators.required ,Validators.pattern(/^\+?[0-9]{8,15}$/)] ) ,
  password: new FormControl(String("") , [Validators.required , Validators.minLength(5)] ) ,
  confirmPassword: new FormControl(String("") , [Validators.required ,Validators.minLength(5) ] ) ,
  address : new FormControl(String("") , Validators.required ) ,
  position : new FormControl(String("") , Validators.required )


  });


  createEmployee(){

    const userData = {
      firstname: String(this.Employee.getRawValue().name),
      lastname: String(this.Employee.getRawValue().surname),
      email:String(this.Employee.getRawValue().email) ,
      password:String( this.Employee.getRawValue().password),
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


  protected readonly String = String;
}
