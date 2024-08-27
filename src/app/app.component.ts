import {Component, OnInit} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {AuthenticationService} from "./globalService/auth/authentication.service";
import {LoginComponent} from "./pages/login/login.component";
import {ApplicationService} from "./globalService/appService/application.service";
import {iconApp, manager} from "./models/models";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  private jwt!: string | null;
  public icon = `<i class="nc-icon nc-chart-bar-32 "></i>`;




  constructor(private service : ApplicationService, private router: Router , public toastr: ToastrService) {
  }

  ngOnInit(): void {
      this.checkPermission() ;
  }

  checkPermission(){
    this.jwt=localStorage.getItem('jwt');
    let user =  JSON.parse(String(localStorage.getItem('user')));
    console.log(this.jwt)
    if(this.jwt != null){
          if(user.role == "ADMIN"){
            console.log("je suis en administrador")
             this.router.navigate(['dashboard']);
            this.toastr.success(this.icon+" Bienvenu dans l'interface administrateur" , "EMPLOYEE MANAGER" , {enableHtml : true});
          }
          if(user.role == "USER"){
            console.log("je suis en user")
            this.router.navigate(['user-profil']);
            this.toastr.success(this.icon+" Bienvenu dans l'interface utilisateur" , "EMPLOYEE MANAGER" , {enableHtml : true});
          }
         /* else{
              console.log("notification de rejet ici ")
              this.router.navigate(['login']);
              this.toastr.error(this.icon+" L'accès vous est refusé !!!" , "EMPLOYEE MANAGER" , {enableHtml : true});
          }*/
    }
    else {
      this.toastr.error(iconApp+" Votre permission d'accès n'est plus valide..! Veuillez vous reconnectez .",manager , {enableHtml:true})
      this.router.navigate(['login']);

    }

  }



}
