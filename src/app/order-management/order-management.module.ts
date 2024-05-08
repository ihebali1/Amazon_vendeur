import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderManagementRoutingModule } from './order-management-routing.module';
import { OrderListComponent } from './pages/order-list/order-list.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { IconModule } from '@visurel/iconify-angular';
import { BreadcrumbsModule } from 'src/@vex/components/breadcrumbs/breadcrumbs.module';
import { PageLayoutModule } from 'src/@vex/components/page-layout/page-layout.module';
import { ContainerModule } from 'src/@vex/directives/container/container.module';
import { CustomerCreateUpdateModule } from '../pages/apps/aio-table/customer-create-update/customer-create-update.module';
import { OrderDetailsComponent } from './pages/order-details/order-details.component';
import { OrderInfoComponent } from './components/order-info/order-info.component';
import { CustomerInfoComponent } from './components/customer-info/customer-info.component';
import { ShippingInfoComponent } from './components/shipping-info/shipping-info.component';
import { ComplaintListComponent } from './components/complaint-list/complaint-list.component';
import { OrderReportChatComponent } from './components/order-report-chat/order-report-chat.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatBadgeModule } from '@angular/material/badge';
import { MatRippleModule } from '@angular/material/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ScrollbarModule } from 'src/@vex/components/scrollbar/scrollbar.module';
import { ChatModule } from '../pages/apps/chat/chat.module';


@NgModule({
  declarations: [
    OrderListComponent,
    OrderDetailsComponent,
    OrderInfoComponent,
    CustomerInfoComponent,
    ShippingInfoComponent,
    ComplaintListComponent,
    OrderReportChatComponent,
  ],
  imports: [
    CommonModule,
    OrderManagementRoutingModule,
    PageLayoutModule,
    FlexLayoutModule,
    BreadcrumbsModule,
    CustomerCreateUpdateModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    IconModule,
    FormsModule,
    MatTooltipModule,
    ReactiveFormsModule,
    ContainerModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
    MatTabsModule,
    MatInputModule,
    ChatModule,
  ]
})
export class OrderManagementModule { }
