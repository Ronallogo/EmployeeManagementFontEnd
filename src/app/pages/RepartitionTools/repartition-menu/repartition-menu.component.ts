import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {iconApp, manager, repartition} from "../../../models/models";
import {RepartitionService} from "../repartition/repartition.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-repartition-menu',
  standalone: true,
    imports: [
        RouterLink,
        RouterLinkActive,
        RouterOutlet
    ],
  templateUrl: './repartition-menu.component.html',
  styleUrl: './repartition-menu.component.css'
})
export class RepartitionMenuComponent{

}
