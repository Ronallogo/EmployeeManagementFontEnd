import { Component, OnInit } from '@angular/core';
import {ApplicationService} from "../globalService/appService/application.service";



export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    views : string ;
}

export const ROUTES: RouteInfo[] = [
    { path: '/dashboard',     title: 'Tableau de bord',         icon:'nc-bank', views : "ADMIN" ,      class: '' },
    { path: '/employee',      title: 'Employé',         icon:'nc-circle-10',   views : "ADMIN" ,    class: '' },
    { path: '/position',      title: 'Poste',        icon:'nc-badge',  views : "ADMIN" ,  class: ' ' },
    { path: '/task',          title: 'Tache',        icon:'nc-icon nc-bookmark-2',  views : "ADMIN" ,  class: '' },
    { path: '/contenu',       title: 'Contenu',    icon:'nc-icon nc-book-bookmark',  views : "ADMIN" ,  class: '' },
    { path: '/user-profil',     title: 'Profil',          icon:'nc-single-02', views : "USER" , class: '' },
    { path: '/task-scheduled',     title: 'Planification',          icon:'nc-icon nc-calendar-60', views : "ADMIN" , class: '' },
    { path: '/repartition',     title: 'Assignation',          icon:'nc-icon nc-vector', views : "ADMIN" , class: '' },
    { path: 'user-task-list',      title: 'Tache à faire',        icon:'nc-bullet-list-67',  views : "USER" ,  class: ' ' },
    { path: '/message',      title: 'Message',        icon:'nc-email-85',  views : "USER" ,  class: ' ' },
   /* { path: '/list-task-scheduled',          title: 'Validation',        icon:'nc-icon nc-tag-content',  views : "ADMIN" ,  class: '' },*/
    { path: '/conge',         title: 'Conge',        icon:'nc-icon  nc-sun-fog-29',  views : "ADMIN" ,  class: '' },
    { path: '/absence',       title: 'Absence',    icon:'nc-icon nc-time-alarm', views : "ADMIN" ,   class: '' },
    { path: '/payStub',      title: 'Payement',  icon:'nc-icon nc-money-coins', views : "ADMIN" ,   class: '' },
    { path: '/icons',         title: 'Icons',  icon:'nc-diamond', views : "ADMIN" ,   class: '' },
    { path: '/user-security',  title: 'Sécurité',   icon:'nc-lock-circle-open', views : "USER" ,   class: '' },
    { path: '/user-demande-conge',         title: 'Demande de Congé',             icon:'nc-icon nc-send', views : "USER" ,   class: '' },
  { path: '/notification',       title: 'Annonces',    icon:'nc-bell-55', views : "USER" , class: '' },
  /*{ path: '/notifications',       title: 'Notifications',    icon:'nc-bell-55', views : "USER" , class: '' },*/
    { path: '/user',          title: 'Utilisateurs',      icon:'nc-single-02', views : "" , class: '' },
   /* { path: '/upgrade',       title: 'Upgrade to PRO',    icon:'nc-spaceship',  class: 'active-pro' },*/
    { path: '/user-payement',       title: 'bulletin de Paie',    icon:'nc-icon nc-money-coins',  views : "USER"  , class: '' },

    { path: '/logout',       title: 'Deconnexion',    icon:'nc-button-power', views : "all" , class: '' },


];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
    styleUrl:'sidebar.css'
})

export class SidebarComponent implements OnInit {

    public  menuItems: any[] = [];
    public user !: {email : string , role : string};

    constructor(private serviceApp : ApplicationService){
    }



    ngOnInit() {
      this.getUser()
      this.menuItems = ROUTES.filter(menuItem => menuItem);
    }


    getUser(){
        let user = localStorage.getItem('user');
        this.user = JSON.parse(String(user));
        console.log(JSON.parse(String(user)));
    }


  protected readonly window = window;
}
