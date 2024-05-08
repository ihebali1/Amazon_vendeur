import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import icAdd from '@iconify/icons-ic/twotone-add';
import icDelete from '@iconify/icons-ic/twotone-delete';

@Component({
  selector: "vex-specifications",
  templateUrl: "./specifications.component.html",
  styleUrls: ["./specifications.component.scss"],
})
export class SpecificationsComponent implements OnInit {
  @Output() specListChanged: EventEmitter<any> = new EventEmitter();
  icDelete = icDelete;
  icAdd = icAdd;
  specifications: Specification[] = [];
  constructor() {

  }

  ngOnInit(): void {}

  addSpecification() {
    this.specifications.push({
      key: "",
      arKey: "",
      value: "",
    });
    this.specListChanged.emit(this.specifications);
  }
  removeSpecification(index){
    this.specifications.splice(index,1);
    this.specListChanged.emit(this.specifications);
  }
}

export class Specification {
  key: string;

  arKey: string;

  value: string;
}
