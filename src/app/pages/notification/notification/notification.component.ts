import {Component, OnInit} from '@angular/core';
import {NotificationService} from "./notification.service";
import {EmployeeService} from "../../EmployeeTools/service/employee.service";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {getTodayDate, iconApp} from "../../../models/models";

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent implements OnInit{

  protected messages : any[] = [];
  private id_employee! : number ;
  constructor(private service  : NotificationService  , private serviceEmployee : EmployeeService) {
  }



  ngOnInit(): void {
    this.getAllNotification();

  }

  getAllNotification(){
    this.id_employee = Number(localStorage.getItem('id_employee'));
    this.service.getAllNotification(this.id_employee).subscribe(data =>{
      this.messages = data ;
      this.messages.reverse()
      this.messages.forEach(message => {
        if(message.date == null ) message.date = getTodayDate() ;
      });
      console.log(data);

    } , error =>{
      console.log(error);
    })
  }



  delete(id : number) {
    this.service.delete(id).subscribe(data =>{
        console.log(data);
    } ,error => {
      console.log(error);
    });
  }
}
