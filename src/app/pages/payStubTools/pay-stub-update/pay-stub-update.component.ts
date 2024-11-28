import {Component, OnInit} from '@angular/core';
import {PayStubService} from "../service/pay-stub.service";
import {ToastrService} from "ngx-toastr";
import {iconApp, manager} from "../../../models/models";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-pay-stub-update',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './pay-stub-update.component.html',
  styleUrl: './pay-stub-update.component.css'
})
export class PayStubUpdateComponent implements OnInit {

  private id : number = 0 ;
  protected payStub = {
    amount : 30000 ,
    nbrTasks : 0,
    bonus : 0 ,
    paymentDate :   "",
    employee : 0
  };





  constructor(private service : PayStubService , private toastrService: ToastrService) {}



  getPayStub(){
    let data = this.service.getPayStub();
    this.id = data.id
    this.payStub.employee = data.employee.id

  }


  ngOnInit(): void {
      this.getPayStub();
  }

  refreshPayStub(){
    this.service.initPayStub(this.id , this.payStub).subscribe(data => {
      console.log(data);
      this.toastrService.success(iconApp + " réinitialisation du bulletin effectué!!!" , manager , {enableHtml:true})
    } , error => {
      console.log(error);
      this.toastrService.error(iconApp + " Erreur de réinitialisation !!!" , manager , {enableHtml:true})
    })
  }

}
