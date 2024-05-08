import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, Output,EventEmitter, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Chat, ChatMessage } from '../chat.component';
import { chatMessages } from '../../../../../static-data/chat-messages';
import { trackById } from '../../../../../@vex/utils/track-by';
import { chats } from '../../../../../static-data/chats';
import { filter, map } from 'rxjs/operators';
import icMoreVert from '@iconify/icons-ic/twotone-more-vert';
import icSend from '@iconify/icons-ic/twotone-send';
import icCheckCircle from '@iconify/icons-ic/twotone-check-circle';
import icAccountCircle from '@iconify/icons-ic/twotone-account-circle';
import icClearAll from '@iconify/icons-ic/twotone-clear-all';
import icVolumeMute from '@iconify/icons-ic/twotone-volume-mute';
import { fadeInUp400ms, } from '../../../../../@vex/animations/fade-in-up.animation';
import { FormControl, FormGroup } from '@angular/forms';
import { stagger20ms } from '../../../../../@vex/animations/stagger.animation';
import { ScrollbarComponent } from '../../../../../@vex/components/scrollbar/scrollbar.component';
import { ChatService } from '../chat.service';
import icMenu from '@iconify/icons-ic/twotone-menu';
import Swal from 'sweetalert2';
import { ConditionalExpr } from '@angular/compiler';



@UntilDestroy()
@Component({
  selector: 'vex-chat-conversation',
  templateUrl: './chat-conversation.component.html',
  styleUrls: ['./chat-conversation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    fadeInUp400ms,
    stagger20ms
  ]
})
export class ChatConversationComponent implements OnInit {
 id:any;
 connectedUser:any;
  chat: Chat;
  message:any;
  messages: ChatMessage[];
  image:any;
  video:any;
  @Output() mainImageChanged: EventEmitter<any> = new EventEmitter();
  form = new FormGroup({
  //  message: new FormControl(),
    content:new FormControl(),
    receiverId: new FormControl(),
  image: new FormControl()
  });

  icAccountCircle = icAccountCircle;
  icClearAll = icClearAll;
  icVolumeMute = icVolumeMute;
  icCheckCircle = icCheckCircle;
  icMoreVert = icMoreVert;
  icSend = icSend;
  icMenu = icMenu;
  trackById = trackById;

  @ViewChild(ScrollbarComponent, { static: true }) scrollbar: ScrollbarComponent;

  constructor(private route: ActivatedRoute,
              private chatService: ChatService,
              private router: Router,
              private cd: ChangeDetectorRef) {
                
              
                this.connectedUser =JSON.parse(localStorage.getItem('user_data')).id;
              console.log(this.connectedUser)
               }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('chatId');
    this.chatService.getVendorsChatMessages(this.id).subscribe(
      res => {
        this.message= res;
      
    console.log(this.message)
      }
    )
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)  
    ).subscribe((event: NavigationEnd) => {
      this.id = this.route.snapshot.paramMap.get('chatId');
      this.chatService.getVendorsChatMessages(this.id).subscribe(
        res => {
          this.message= res;
          this.cd.detectChanges()
          this.cd.checkNoChanges()
        
      console.log(this.message)
        }
      )
    });
 
   
    this.route.paramMap.pipe(
      map(paramMap => +paramMap.get('chatId')),
      untilDestroyed(this)
    ).subscribe(chatId => {
      this.messages = [];
      this.cd.detectChanges();
      this.chat = chats.find(chat => chat.id === chatId);
    
      this.filterMessages(chatId);
      this.cd.detectChanges();
      this.scrollToBottom();
    });
 
  }

  filterMessages(id: ChatMessage['id']) {
    this.messages = chatMessages.filter(message => message.id === id);
  }

  onFileInput(files: FileList) {
    let reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        this.image = reader.result;
       //console.log(this.image);
        this.mainImageChanged.emit(this.image);
      }
    };
    
    reader.readAsDataURL(files[0]);
    
}
  createMessage() {
    this.chatService.create({
      ...this.form.getRawValue(),
      receiverId:this.id,
      image:this.image
    
   }).subscribe(
    res=> {
      this.id = this.route.snapshot.paramMap.get('chatId');
      this.chatService.getVendorsChatMessages(this.id).subscribe(
        res => {
          this.message= res;
          this.cd.detectChanges()
          this.cd.checkNoChanges()
          this.form.reset()
        
      console.log(this.message)
        }
      )
    }
   )  

    }
  send() {
    this.messages.push({
      id: this.chat.id,
      from: 'me',
      message: this.form.get('message').value
    });

    this.form.get('message').setValue('');

    this.cd.detectChanges();
    this.scrollToBottom();
  }

  scrollToBottom() {
    this.scrollbar.scrollbarRef.getScrollElement().scrollTo({
      behavior: 'smooth',
      top: this.scrollbar.scrollbarRef.getContentElement().clientHeight
    });
  }

  openDrawer() {
    this.chatService.drawerOpen.next(true);
    this.cd.markForCheck();
  }

  closeDrawer() {
    this.chatService.drawerOpen.next(false);
    this.cd.markForCheck();
  }
}
