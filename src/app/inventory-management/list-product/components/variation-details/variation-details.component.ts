import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'vex-variation-details',
  templateUrl: './variation-details.component.html',
  styleUrls: ['./variation-details.component.scss']
})
export class VariationDetailsComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(data)
   }

  ngOnInit(): void {
  }

}
