import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PopoverService } from '../../../components/popover/popover.service';
import { ToolbarNotificationsDropdownComponent } from './toolbar-notifications-dropdown/toolbar-notifications-dropdown.component';
import icNotificationsActive from '@iconify/icons-ic/twotone-notifications-active';
import { UserNotification } from 'src/app/shared/models/user-notification';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { NotificationTypeEnum } from 'src/app/shared/models/notification';
import icChat from '@iconify/icons-ic/chat-bubble';
import icMoney from '@iconify/icons-ic/round-money';
import icFeedback from '@iconify/icons-ic/twotone-feedback';
import icBarCode from '@iconify/icons-ic/baseline-barcode';
import icSettings from '@iconify/icons-ic/twotone-settings';
import icChevronRight from '@iconify/icons-ic/twotone-chevron-right';
import icNotificationsOff from '@iconify/icons-ic/twotone-notifications-off';
import icClearAll from '@iconify/icons-ic/twotone-clear-all';
import icShoppingBasket from '@iconify/icons-ic/twotone-shopping-basket';
import icAccountCircle from '@iconify/icons-ic/twotone-account-circle';
import icInsertChart from '@iconify/icons-ic/twotone-insert-chart';
@Component({
  selector: 'vex-toolbar-notifications',
  templateUrl: './toolbar-notifications.component.html',
  styleUrls: ['./toolbar-notifications.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarNotificationsComponent implements OnInit {

  @ViewChild('originRef', { static: true, read: ElementRef }) originRef: ElementRef;
  icSettings = icSettings;
  icChevronRight = icChevronRight;
  icClearAll = icClearAll;
  icNotificationsOff = icNotificationsOff;
  dropdownOpen: boolean;
  icNotificationsActive = icNotificationsActive;

  constructor(private popover: PopoverService,
              private cd: ChangeDetectorRef,
              private notificationService: NotificationService) {}

              userNotifications: UserNotification[] = [];

              ngOnInit() {
                //this.getNotifications()
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

  showPopover() {
    this.dropdownOpen = true;
    this.cd.markForCheck();

    const popoverRef = this.popover.open({
      content: ToolbarNotificationsDropdownComponent,
      origin: this.originRef,
      offsetY: 12,
      position: [
        {
          originX: 'center',
          originY: 'top',
          overlayX: 'center',
          overlayY: 'bottom'
        },
        {
          originX: 'end',
          originY: 'bottom',
          overlayX: 'end',
          overlayY: 'top',
        },
      ]
    });

    popoverRef.afterClosed$.subscribe(() => {
      this.dropdownOpen = false;
      this.cd.markForCheck();
    });
  }
}
