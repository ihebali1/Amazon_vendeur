import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { FileService } from "src/app/shared/services/file.service";
import { LoginService } from "../../../login/services/login.service";
import { VerificationService } from "../../services/verification.service";

@Component({
  selector: "vex-verification",
  templateUrl: "./verification.component.html",
  styleUrls: ["./verification.component.scss"],
})
export class VerificationComponent implements OnInit {
  @Input() info: any;
  verif: FormGroup;
  document = null;
  back_side = null;
  front_side = null;
  image: string | ArrayBuffer;
  statement: string | ArrayBuffer;

  constructor(
    private verificationService: VerificationService,
    private fileService: FileService,
    public loginService: LoginService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.verif = fb.group({
      back_side: false,
      front_side: false,
      mushroom: false,
    });
  }

  ngOnInit(): void {
    this.getVendor();
  }
  getVendor = () => {
    this.verificationService.getVendorInfo().subscribe((res) => {
      this.info = res;
    });
  };

  onFrontFileInput(files: FileList) {
    let reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        this.front_side = reader.result;
        console.log(this.front_side);
      }
    };

    reader.readAsDataURL(files[0]);
  }
  onBackFileInput(files: FileList) {
    let reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        this.back_side = reader.result;
        console.log(this.back_side);
      }
    };

    reader.readAsDataURL(files[0]);
  }
  onStatementFileInput(files: FileList) {
    let reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        this.statement = reader.result;
        console.log(this.statement);
      }
    };

    reader.readAsDataURL(files[0]);
  }
  submitDocuments() {
    this.fileService.uploadFile(this.front_side).subscribe((frontSide: any) => {
      this.fileService.uploadFile(this.back_side).subscribe((backSide: any) => {
        this.fileService
          .uploadFile(this.statement)
          .subscribe((statement: any) => {
            this.verificationService
              .submitDocuments({
                identityFront: frontSide.id,
                identityBack: backSide.id,
                statementDocument: statement.id,
              })
              .subscribe((res: any) => {
                if (res.isVerificationFullfilled == true) {
                  this.loginService.logout();
                }
              });
          });
      });
    });
  }
}
