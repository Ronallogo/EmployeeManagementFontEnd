import { Component, OnInit } from '@angular/core';
import {ApplicationService} from "../globalService/appService/application.service";


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/dashboard',     title: 'Tableau de bord',         icon:'nc-bank',       class: '' },
    { path: '/employee',      title: 'Employé',         icon:'nc-circle-10',       class: '' },
    { path: '/position',      title: 'Poste',        icon:'nc-badge',    class: '' },
    { path: '/task',          title: 'Tache',        icon:'nc-icon nc-bookmark-2',    class: '' },
    { path: '/contenu',       title: 'Contenu',    icon:'nc-icon nc-book-bookmark',    class: '' },
    { path: '/conge',         title: 'Conge',        icon:'nc-icon  nc-sun-fog-29',    class: '' },
    { path: '/absence',       title: 'Absence',    icon:'nc-icon nc-time-alarm',    class: '' },
    { path: '/payement',      title: 'payement',  icon:'nc-icon nc-money-coins',    class: '' },
    { path: '/icons',         title: 'Icons',             icon:'nc-diamond',    class: '' },
    { path: '/user',          title: 'User Profile',      icon:'nc-single-02',  class: '' },
   /* { path: '/upgrade',       title: 'Upgrade to PRO',    icon:'nc-spaceship',  class: 'active-pro' },*/
    { path: '/logout',       title: 'Deconnexion',    icon:'nc-button-power',  class: '' },
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    protected deconnexion = "deconnexion"
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

}
