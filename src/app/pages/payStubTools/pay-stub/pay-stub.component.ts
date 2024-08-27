import { Component } from '@angular/core';
import {PayStubMenuComponent} from "../pay-stub-menu/pay-stub-menu.component";

@Component({
  selector: 'app-pay-stub',
  standalone: true,
  imports: [
    PayStubMenuComponent
  ],
  templateUrl: './pay-stub.component.html',
  styleUrl: './pay-stub.component.css'
})
export class PayStubComponent {

}
