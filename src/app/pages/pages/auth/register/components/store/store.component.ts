import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'vex-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {
  @Output() storeInfoChanged: EventEmitter<any> = new EventEmitter();
Store: FormGroup;
storeName=null;
  constructor(private fb: FormBuilder,
    private StoreService: StoreService) { }
      
  ngOnInit(): void {
    this.Store = this.fb.group({
      storeName:['', Validators.maxLength(50)],
      storeDescription:['', Validators.maxLength(250)],
  });
  }

  
Store_Info(){
  this.StoreService.updateStore(this.Store.getRawValue()).subscribe((res: any) =>{
    console.log(res);
    this.StoreService.saveStore(res.info);
    this.storeInfoChanged.emit(true);
    
  })
}
}
