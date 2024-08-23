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
  tokenObject !: any;
  public message : string  = "nous sur le bon chemin !!!!!!!!"



  dataConnexion : {
    email : string ,
    password : string
  } = {email: "", password : ""}


  constructor(private serviceApp : ApplicationService , public toastr: ToastrService) {
  }

  ngOnInit(): void {
  }

  onLogin():void{
    console.log(this.dataConnexion);
    this.serviceApp.login(this.dataConnexion).subscribe(data => {
        console.log(data);
        this.serviceApp.saveToken(data.body);
        this.showSuccess()
        this.serviceApp.setPermission(true);

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
