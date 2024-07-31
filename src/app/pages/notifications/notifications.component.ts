import { Component } from '@angular/core';
import { ToastrService } from "ngx-toastr";


@Component({
    selector: 'notifications-cmp',

    templateUrl: 'notifications.component.html'
})

export class NotificationsComponent{
  constructor(private toastr: ToastrService) {}

  showNotification(bottom: string, right: string) {

  }
}
