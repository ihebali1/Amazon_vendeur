import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { PayoutService } from "../../services/payout.service";

@Component({
  selector: "vex-create-payout",
  templateUrl: "./create-payout.component.html",
  styleUrls: ["./create-payout.component.scss"],
})
export class CreatePayoutComponent implements OnInit {
  loading = false;
  formPayout = new FormGroup({
    amount: new FormControl(),
  });
  constructor(
    private payoutService: PayoutService,
    private router: Router,
    public dialogRef: MatDialogRef<CreatePayoutComponent>
  ) {}

  ngOnInit(): void {}

  createPayout() {
    this.loading = true;
    this.payoutService.addPayout(this.formPayout.getRawValue()).subscribe(
      (res) => {
        this.loading = false;
        Swal.fire({
          icon: "success",
          title: "تم حفظ ",
          showConfirmButton: false,
          timer: 3000,
        }).finally(
          ()=> this.dialogRef.close()
        )
        
      },
      (error) => {
        Swal.fire({
          icon: "error",
          title: error.error.message,
          showConfirmButton: false,
          timer: 1500,
        });
        this.dialogRef.close();
      }
    );
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
