import {Component, OnInit} from '@angular/core';
import {PayStubService} from "../../../payStubTools/service/pay-stub.service";
import {ToastrService} from "ngx-toastr";
import {iconApp, manager} from "../../../../models/models";

@Component({
  selector: 'app-user-payement',
  standalone: true,
  imports: [],
  templateUrl: './user-payement.component.html',
  styleUrl: './user-payement.component.css'
})
export class UserPayementComponent implements OnInit {
  private userEmail = JSON.parse(String(localStorage.getItem('user'))).email;

  constructor(private service : PayStubService , private toastr : ToastrService ) {
  }

  ngOnInit(): void {
      this.getAllInformation();
  }


  getAllInformation(){
        this.service.getPayStubForOne(this.userEmail).subscribe(data =>{
            console.log(data);
            this.toastr.info(iconApp+" information du bulletin de paie chargés" , manager , {enableHtml:true});

        },error => {
          console.log(error);
          this.toastr.error(iconApp+" erreur de chargement !!" , manager , {enableHtml:true});

        })
  }

}
