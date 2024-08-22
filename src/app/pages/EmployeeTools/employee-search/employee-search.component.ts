import {Component, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {EmployeeService} from "../service/employee.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-employee-search',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink,
    RouterLinkActive,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './employee-search.component.html',
  styleUrl: './employee-search.component.css'
})
export class EmployeeSearchComponent implements OnInit{
  protected listEmployee : any[] =[];

  protected header : string[] = ["No" , "Nom " ,"Prénom ","Date de naissance" ,"Email",  "Téléphone" , "Adresse" ,"Position" , "Actions" ]
  keyword: string = "";


  constructor(protected service : EmployeeService){}
  ngOnInit(): void {
  }


  search(keyword: string){
      this.service.searchEmployee(keyword).subscribe(data =>{
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
