import { Component, OnInit } from '@angular/core';
import { trackById } from '../../../../utils/track-by';
import icSettings from '@iconify/icons-ic/twotone-settings';
import icChevronRight from '@iconify/icons-ic/twotone-chevron-right';
import icNotificationsOff from '@iconify/icons-ic/twotone-notifications-off';
import icClearAll from '@iconify/icons-ic/twotone-clear-all';
import icShoppingBasket from '@iconify/icons-ic/twotone-shopping-basket';
import icAccountCircle from '@iconify/icons-ic/twotone-account-circle';
import icInsertChart from '@iconify/icons-ic/twotone-insert-chart';
import icCheckCircle from '@iconify/icons-ic/twotone-check-circle';
import icDescription from '@iconify/icons-ic/twotone-description';
import icFeedback from '@iconify/icons-ic/twotone-feedback';
import icBarCode from '@iconify/icons-ic/baseline-barcode'
import icVerifiedUser from '@iconify/icons-ic/twotone-verified-user';
import icFileCopy from '@iconify/icons-ic/twotone-file-copy';
import icChat from '@iconify/icons-ic/chat-bubble';
import icMoney from '@iconify/icons-ic/round-money';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { UserNotification } from 'src/app/shared/models/user-notification';
import { NotificationTypeEnum } from 'src/app/shared/models/notification';
import { Router } from '@angular/router';

@Component({
  selector: 'vex-toolbar-notifications-dropdown',
  templateUrl: './toolbar-notifications-dropdown.component.html',
  styleUrls: ['./toolbar-notifications-dropdown.component.scss']
})
export class ToolbarNotificationsDropdownComponent implements OnInit {



  icSettings = icSettings;
  icChevronRight = icChevronRight;
  icClearAll = icClearAll;
  icNotificationsOff = icNotificationsOff;
  trackById = trackById;

  constructor(private notificationService: NotificationService, private router: Router) { }
  userNotifications: UserNotification[] = [];

  ngOnInit() {
    this.getNotifications()
  }

  getNotifications = () => {
    this.notificationService.getNotifications(50).subscribe(
      res => {
        this.userNotifications = res;
        for (const notification of this.userNotifications) {
          if (notification.notification.type == NotificationTypeEnum.ORDER) {
            notification.icon = icShoppingBasket,
              notification.colorClass = 'text-primary'
          }
          if (notification.notification.type == NotificationTypeEnum.REPORT) {
            notification.icon = icFeedback,
              notification.colorClass = 'text-orange'
          }
          if (notification.notification.type == NotificationTypeEnum.USER) {
            notification.icon = icAccountCircle,
              notification.colorClass = 'text-blue'
          }
          if (notification.notification.type == NotificationTypeEnum.INCOME) {
            notification.icon = icMoney,
              notification.colorClass = 'text-secondary'
          }
          if (notification.notification.type == NotificationTypeEnum.PAYOUT) {
            notification.icon = icInsertChart,
              notification.colorClass = 'text-secondary'
          }
          if (notification.notification.type == NotificationTypeEnum.PRODUCT) {
            notification.icon = icBarCode,
              notification.colorClass = 'text-secondary'
          }
          if (notification.notification.type == NotificationTypeEnum.CHAT) {
            notification.icon = icChat,
              notification.colorClass = 'text-secondary'
          }
        }
      }
    )
  }

  redirect(notification: UserNotification) {

    if (notification.notification.type == NotificationTypeEnum.REPORT) {
      this.router.navigate(['/manage-orders/list'])
    }

    if (notification.notification.type == NotificationTypeEnum.CHAT) {
      this.router.navigate(['/apps/chat',notification.notification.chat.userSend.id])
    }

    if (notification.notification.type == NotificationTypeEnum.PAYOUT) {
      this.router.navigate(['/payout/list'])
    }

    if (notification.notification.type == NotificationTypeEnum.INCOME) {
      this.router.navigate(['/incomes/list'])
    }

    if (notification.notification.type == NotificationTypeEnum.ORDER) {
      this.router.navigate(['/manage-orders/details', notification.notification.order?.id],
        {
          queryParams: { id: notification.notification.order?.id },
        })
    }

    if (notification.notification.type == NotificationTypeEnum.PRODUCT) {
      this.router.navigate(['/manage-inventory/catalog/details', notification.notification.product?.id],
        {
          queryParams: {
            type: notification.notification.product?.type,
            id: notification.notification.product?.id
          },
        })
    }

  }

  updateNotificationStatus = (id: string) => this.notificationService.updateNotificationStaus(id, 'USER').subscribe(
    res => { this.getNotifications() }
  )

  getUnseenNotification = () => {
    let count = 0;
    for (const notification of this.userNotifications) {
      if (notification.isSeen == false) count++
    }
    return count;
  }
}
