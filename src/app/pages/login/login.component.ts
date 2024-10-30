import {Component, OnInit} from '@angular/core';
import {ApplicationService} from "../../globalService/appService/application.service";
import {ToastrService} from "ngx-toastr";
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  token !:string |null;
  public message : string  = "nous sur le bon chemin !!!!!!!!";
  public icon = `<i class="nc-icon nc-chart-bar-32 "></i>`;

  roles : string[]  =  ["USER" , "ADMIN"];
  protected dataUser : {
    email : string ,
    role : string
  } = {email: "", role : ""}

  protected dataConnexion : {
    email : string ,
    password : string
  } = {email: "", password : ""}


  constructor(private serviceApp : ApplicationService , public toastr: ToastrService , private router : Router) {
  }

  ngOnInit(): void {

  }

  onLogin():void{
    console.log(this.dataConnexion);
    this.serviceApp.login(this.dataConnexion).subscribe(data => {
        this.serviceApp.saveToken(data.body);
        this.dataUser = this.serviceApp.getUser() ;
        this.token =    localStorage.getItem('jwt') ;


        if(this.dataUser.role =="USER" || this.dataUser.role =="ADMIN"){
            this.serviceApp.parseJWT()
            this.showSuccess()

          if(this.dataUser.role == "ADMIN"){
            console.log("je suis en administrator")
            this.router.navigate(['dashboard']);
            this.toastr.success(this.icon+" Bienvenu dans l'interface administrateur" , "EMPLOYEE MANAGER" , {enableHtml : true});
          }
          if(this.dataUser.role == "USER"){
            console.log("je suis en user")
            this.router.navigate(['user-profil']);
            this.toastr.success(this.icon+" Bienvenu dans l'interface utilisateur" , "EMPLOYEE MANAGER" , {enableHtml : true});
          }
         /* else{
            this.router.navigate(['login']);
            this.toastr.error(this.icon+" L'accès vous est refusé !!!" , "EMPLOYEE MANAGER" , {enableHtml : true});
          }*/

        }

    } , error => {
      console.log(error);
      console.log("notification de rejection")
      this.showFailed()
    })
  }


  showSuccess() {
    this.toastr.success('Opération éffectuée avec succes !', 'Employee Manager !');
  }
  showFailed(){
    this.toastr.error(" L'accès vous est refusé  ...Vérifiez que votre email et votre mot de passe soient valide !! ", 'Employee Manager!!');
  }

}
