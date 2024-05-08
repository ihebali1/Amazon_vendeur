import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'vex-shipping-info',
  templateUrl: './shipping-info.component.html',
  styleUrls: ['./shipping-info.component.scss']
})
export class ShippingInfoComponent implements OnInit {
  orderId: string;
  order: any;

  swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })
  
  

  constructor(private route: ActivatedRoute, private orderService: OrdersService) {
    this.route.queryParams
      .subscribe(params => {
        console.log(params); // { orderby: "price" }
        this.orderId = params.id;
      }
    );
   }

  ngOnInit(): void {
    this.getOrder()
  }

  getOrder() {
    this.orderService.getOrder(this.orderId).subscribe(
      res => {
        this.order = res;
      }
    )
  }

  setOrderPrepared() {
    Swal.fire({
      title: 'هل أنت متأكد؟',
      text: "لن تتمكن من التراجع عن هذا!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'تأكيد',
      cancelButtonText: 'إلغاء',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.orderService.updateShippingInfo(this.orderId, 'PREPARED').subscribe(
          res=> { 
            
            Swal.fire(
              'تم التغيير بنجاح',
              'تم تغيير حالة الطلب إلى جاهز للتسليم',
              'success'
            ).then(
              () => this.ngOnInit()
            )}
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire(
          'ألغيت',
          'تم الإلغاء بنجاح',
          'info'
        )
      }
    })
   

  }

}
