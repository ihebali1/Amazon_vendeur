import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Income} from "../../models/income.model";
import {IncomeService} from "../../services/income.service";

@Component({
  selector: 'vex-income-details',
  templateUrl: './income-details.component.html',
  styleUrls: ['./income-details.component.scss']
})
export class IncomeDetailsComponent implements OnInit {
  products:any;
  spinner= true;
  constructor(@Inject(MAT_DIALOG_DATA) public data: Income,
              private dialogRef: MatDialogRef<IncomeDetailsComponent>, private incomeService: IncomeService) {
  }

  ngOnInit(): void {
    this.incomeService.getIncomeById(this.data.id).subscribe((res:any) => {
      this.spinner = false ;
      this.products = res[0].order.orderItems;
    });
  }

  closeDiag() {
    this.dialogRef.close();
  }
}
