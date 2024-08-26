import {Component, OnInit} from '@angular/core';
import {ApplicationService} from "../../globalService/appService/application.service";
import {ToastrService} from "ngx-toastr";
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {routes} from "../../app.routes";

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
    this.serviceApp.loadToken()
    this.serviceApp.setPermission(false);

  }

  onLogin():void{
    console.log(this.dataConnexion);
    this.serviceApp.login(this.dataConnexion).subscribe(data => {
        console.log(data);
        this.serviceApp.saveToken(data.body);
        this.dataUser = this.serviceApp.getUser() ;
        this.token =    localStorage.getItem('jwt') ;
      console.log(localStorage.getItem("jwt"))
      console.log(localStorage.getItem("user"))
        if(this.dataUser.role =="USER" || this.dataUser.role =="ADMIN"){
            this.serviceApp.parseJWT()
            this.showSuccess()
            this.serviceApp.setPermission(true);
          if(this.dataUser.role == "ADMIN"){
            console.log("je suis en administrador")
            this.router.navigate(['dashboard']);
            this.toastr.success(this.icon+" Bienvenu dans l'interface administrateur" , "EMPLOYEE MANAGER" , {enableHtml : true});
          }
          if(this.dataUser.role == "USER"){
            console.log("je suis en user")
            this.router.navigate(['user-profil']);
            this.toastr.success(this.icon+" Bienvenu dans l'interface utilisateur" , "EMPLOYEE MANAGER" , {enableHtml : true});
          }
          else{
            this.router.navigate(['login']);
            this.toastr.error(this.icon+" L'accès vous est refusé !!!" , "EMPLOYEE MANAGER" , {enableHtml : true});
          }

        }

    } , error => {
      console.log(error);
      this.showFailed()
    })
  }
  /*
  * <div class="user">
<div class="info">
<div class="photo">
<img src="../../assets/img/faces/face-2.jpg">
</div>
<a data-toggle="collapse" href="#collapseExample" class="collapsed" aria-expanded="false">
<span>
Chet Faker
<b class="caret"></b>
</span>
</a>
<div class="clearfix"></div>
<div class="collapse" id="collapseExample" aria-expanded="false" style="height: 0px;">
<ul class="nav">
<li>
<a href="#profile">
<span class="sidebar-mini">Mp</span>
<span class="sidebar-normal">My Profile</span>
</a>
</li>
<li>
<a href="#edit">
<span class="sidebar-mini">Ep</span>
<span class="sidebar-normal">Edit Profile</span>
</a>
</li>
<li>
<a href="#settings">
<span class="sidebar-mini">S</span>
<span class="sidebar-normal">Settings</span>
</a>
</li>
</ul>
</div>
</div>
</div>
  *
  *
  * */

  showSuccess() {
    this.toastr.success('Opération éffectuée avec succes !', 'Employee Manager !');
  }
  showFailed(){
    this.toastr.error('Une erreur est subvenu !', 'Employee Manager!!');
  }

}
