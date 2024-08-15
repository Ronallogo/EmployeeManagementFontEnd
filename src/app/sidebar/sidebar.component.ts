import { Component, OnInit } from '@angular/core';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/dashboard',     title: 'Tableau de bord',         icon:'nc-bank',       class: '' },
    { path: '/employee',     title: 'Employé',         icon:'nc-circle-10',       class: '' },
    { path: '/position',         title: 'Poste',        icon:'nc-badge',    class: '' },
    { path: '/task',         title: 'Tache',        icon:'nc-icon nc-bookmark-2',    class: '' },
    { path: '/contenu',         title: 'Contenu',        icon:'nc-icon nc-book-bookmark',    class: '' },
    { path: '/icons',         title: 'Icons',             icon:'nc-diamond',    class: '' },
    { path: '/maps',          title: 'Maps',              icon:'nc-pin-3',      class: '' },
    { path: '/notifications', title: 'Notifications',     icon:'nc-bell-55',    class: '' },
    { path: '/user',          title: 'User Profile',      icon:'nc-single-02',  class: '' },
    { path: '/table',         title: 'Table List',        icon:'nc-tile-56',    class: '' },

    { path: '/upgrade',       title: 'Upgrade to PRO',    icon:'nc-spaceship',  class: 'active-pro' },
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public  menuItems: any[] = [];
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
}
