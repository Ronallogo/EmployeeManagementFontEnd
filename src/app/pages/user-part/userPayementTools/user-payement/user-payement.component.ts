import {Component, OnInit} from '@angular/core';
import {PayStubService} from "../../../payStubTools/service/pay-stub.service";
import {ToastrService} from "ngx-toastr";
import {iconApp, manager, PayStubModel, PayStubModel2} from "../../../../models/models";
import {UserSettingService} from "../../service/user-setting.service";

@Component({
  selector: 'app-user-payement',
  standalone: true,
  imports: [],
  templateUrl: './user-payement.component.html',
  styleUrl: './user-payement.component.css'
})
export class UserPayementComponent implements OnInit {


  private userEmail = JSON.parse(String(localStorage.getItem('user'))).email;
  private  id !: number ;
  protected userPayStub !: { amount: number; bonus: number; nbrTasks: number; paymentDate: string; employee: any }


  constructor(private service : PayStubService , private toastr : ToastrService  , private setting : UserSettingService) {
  }

  ngOnInit(): void {
      this.getAllInformation();

  }


  getAllInformation(){
        this.service.getPayStubForOne(this.userEmail).subscribe(data =>{
            console.log(data);
            this.userPayStub = data;
            this.id = data.id;
            this.toastr.info(iconApp+" information du bulletin de paie chargés" , manager , {enableHtml:true});

        },error => {
          console.log(error);
          this.toastr.error(iconApp+" erreur de chargement !!" , manager , {enableHtml:true});

        })
  }
   refreshDataPayStub(){
        console.log("je suis dans la fonction")

        let Data = {
            amount : this.userPayStub.amount ,
            nbrTasks : this.userPayStub.nbrTasks,
            bonus  : this.userPayStub.bonus ,
            paymentDate : this.userPayStub.paymentDate ,
            employee : this.userPayStub.employee.id

        };
        console.log("voici data :"+Data)
        console.log("voici data :"+this.id)

        this.service.refreshPayStub(this.id ,  Data).subscribe((data : PayStubModel2 )=>{
          this.userPayStub = {
            amount : data.amount,
            nbrTasks : data.nbrTasks,
            bonus  : data.bonus ,
            paymentDate : data.paymentDate ,
            employee : data.employee

          };
            this.toastr.success(iconApp+" Votre bulletin est maintenant à jour..!" , manager , {enableHtml:true})
        } ,error => {
            this.toastr.warning(iconApp+" Votre bulletin ne peut pas subir une mise à jour pour le moment..!" , manager , {enableHtml:true})
          console.log(error)
        })


   }


  generePdf(){

    this.setting.report(this.id).subscribe((data : Blob) => {
      console.log(data);
      const blob = new Blob([data], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'bulletin_de_paie.pdf';
      a.click();
      URL.revokeObjectURL(url);
      this.toastr.success(iconApp+" génération réussie !! \n"+data , manager , {enableHtml:true} );
    } , error => {
      this.toastr.error(iconApp +" Erreur de génération!!!!" , manager , {enableHtml:true});
      console.log(error)
    })
  }

}
