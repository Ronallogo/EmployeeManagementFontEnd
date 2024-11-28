import {Component, OnInit} from '@angular/core';
import {ApplicationService} from "../../globalService/appService/application.service";
import {Router} from "@angular/router";

import Swal from "sweetalert2";

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent implements OnInit{
  private usr = JSON.parse(String(localStorage.getItem("user")));

  constructor(private service:ApplicationService , private router: Router){}
  ngOnInit(): void {

    Swal.fire({
      title: "Etes vous sur de vouloir quitter ?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#e62b2b",
      confirmButtonText: "Déconnexion" ,
      cancelButtonText: "annuler" ,
      backdrop: `
    rgba(0,0,0,0.9)
    left top
    no-repeat
  ` ,
      showClass: {
        popup: `
      animate__animated
      animate__fadeInUp

    `
      },
      hideClass: {
        popup: `
      animate__animated
      animate__fadeOutDown
      animate__faster
    `
      }

    }).then((result) => {
      if (result.isConfirmed) {
        this.service.logout();
        this.router.navigateByUrl("/login")
      }
      else{
        this.redirection(false);
      }
    });
    /*if (!conf){
      this.redirection(conf);
    }
    if(conf){
      this.service.logout();
      this.router.navigateByUrl("/login")

    }*/



  }
  redirection(conf : boolean ){


    if(!conf){
        if( this.usr.role == "ADMIN")this.router.navigateByUrl("/dashboard");
        if( this.usr.role == "USER")this.router.navigateByUrl("/user-profil");
        localStorage.setItem("user" , JSON.stringify(this.usr));
    }


  }

}
