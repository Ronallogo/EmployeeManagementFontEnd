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


  constructor(private service : ApplicationService, private router: Router) {
  }

  ngOnInit(): void {
  }

  checkPermission(){
    return this.service.getPermission();
  }



}
