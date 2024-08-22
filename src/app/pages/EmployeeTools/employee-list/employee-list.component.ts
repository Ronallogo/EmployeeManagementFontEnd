import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {EmployeeService} from "../service/employee.service";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent  implements OnInit{


  protected listEmployee : any[] =[];

  protected header : string[] = ["No" , "Nom " ,"Prénom ","Date de naissance" ,"Email",  "Téléphone" , "Adresse" ,"Position" , "Actions" ]
  constructor(protected service : EmployeeService) {
  }

  ngOnInit(): void {
      this.getAlllEmployee() ;
  }

  getAlllEmployee(){
      this.service.allEmployees().subscribe(data =>{
          this.listEmployee = data ;
          console.log(data)
      })
  }


  deleteEmployee(id:number) {
      this.service.deleteEmployee(id).subscribe (data => {
        console.log(data);
        window.location.reload();
      })
  }
}
