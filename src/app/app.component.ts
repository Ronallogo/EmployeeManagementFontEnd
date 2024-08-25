import {Component, OnInit} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {AuthenticationService} from "./globalService/auth/authentication.service";
import {LoginComponent} from "./pages/login/login.component";
import {ApplicationService} from "./globalService/appService/application.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  private jwt!: string | null;




  constructor(private service : ApplicationService, private router: Router , public toastr: ToastrService) {
  }

  ngOnInit(): void {
      this.checkPermission() ;
  }

  checkPermission(){
    this.jwt=localStorage.getItem('jwt');
    if(this.jwt != null){
          this.router.navigate(['dashboard']);
    }
    else{
      this.router.navigate(["/login"]);
    }
  }



}
