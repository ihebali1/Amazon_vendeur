import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FileService } from 'src/app/shared/services/file.service';
import { environment } from 'src/environments/environment';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'vex-complaint-list',
  templateUrl: './complaint-list.component.html',
  styleUrls: ['./complaint-list.component.scss']
})
export class ComplaintListComponent implements OnInit {
  report: any;
  messages: any;
  orderId: string;
  userData: any;
  server: any;

  image: any;
  video: any;
  messageForm: FormGroup = new FormGroup(
    {
          message: new FormControl(''),
    }
      );

  @ViewChild('scrollMe') private myScrollContainer: any;

  constructor(private orderService: OrdersService, private route: ActivatedRoute, private fileService: FileService) {
    this.route.queryParams
      .subscribe(params => {
        console.log(params); // { orderby: "price" }
        this.orderId = params.id;
      }
    );
    this.userData =  JSON.parse(localStorage.getItem('user_data'));
    this.server = environment.baseUrl
   }

  getOrderDetails() {
    this.orderService.getOrder(this.orderId).subscribe(
      (res: any)=> {
        this.report = res.report;
        this.getMessages(res.report.id)

      }
    )
  }

  scrollToBottom(): void {
    try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }                 
}

  getMessages(reportId: string) {
    this.orderService.getReportMessages(reportId).subscribe(
      res => {
        this.messages = res;
        this.scrollToBottom()
      }
    )
  }

  sendMessage() {
    if(this.image) {
      this.fileService.uploadFile(this.image).subscribe(
        (image: any) => {
          if(this.video) {
            this.fileService.uploadFile(this.video).subscribe(
              (video: any) => {
                this.submitMessage(image.id, video.id);
              }
            )
          } else {
            
                this.submitMessage(image.id, null);
             
          }
        }
      )
    } else {
          if(this.video) {
            this.fileService.uploadFile(this.video).subscribe(
              (video: any) => {
                this.submitMessage(null, video.id);
              }
            )
          } else {
            this.submitMessage(null, null);
          }
    }
    
  }

  submitMessage(imageId: any, videoId: any) {
    this.orderService.sendMessage(this.report.id, this.messageForm.getRawValue().message, imageId, videoId).subscribe(
      (res: any) => {
      
        this.getMessages(this.report.id);
        this.messageForm.reset();
        this.image=null;
        this.video=null;
      },
      
    )
  }
  
  onImageInput(event: Event) {
    let reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        this.image = reader.result;
        //console.log(this.image);
      }
    };
    const target= event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    reader.readAsDataURL(file);
}

onVideoInput(event: Event) {
  let reader = new FileReader();
  reader.onload = () => {
    if (reader.result) {
      this.video = reader.result;
      //console.log(this.image);
    }
  };
  const target= event.target as HTMLInputElement;
  const file: File = (target.files as FileList)[0];
  reader.readAsDataURL(file);
}

  ngOnInit(): void {
    this.getOrderDetails()
  }

}
