import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import icVisibility from "@iconify/icons-ic/twotone-visibility";
import icVisibilityOff from "@iconify/icons-ic/twotone-visibility-off";
import { fadeInUp400ms } from "../../../../../@vex/animations/fade-in-up.animation";
import { LoginService } from "./services/login.service";
import { VerificationService } from "../register/services/verification.service";
import Swal from "sweetalert2";

@Component({
  selector: "vex-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInUp400ms],
})
export class LoginComponent implements OnInit {
  email = new FormControl("", [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError("required")) {
      return "You must enter a value";
    }

    return this.email.hasError("email") ? "Not a valid email" : "";
  }

  form: FormGroup;

  inputType = "password";
  visible = false;

  icVisibility = icVisibility;
  icVisibilityOff = icVisibilityOff;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private snackbar: MatSnackBar,
    private loginservice: LoginService,
    private verificationService: VerificationService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  send() {
    this.router.navigate(["/"]);
    this.snackbar.open(
      "Lucky you! Looks like you didn't need a password or email address! For a real application we provide validators to prevent this. ;)",
      "LOL THANKS",
      {
        duration: 10000,
      }
    );
  }

  toggleVisibility() {
    if (this.visible) {
      this.inputType = "password";
      this.visible = false;
      this.cd.markForCheck();
    } else {
      this.inputType = "text";
      this.visible = true;
      this.cd.markForCheck();
    }
  }
  login() {
    this.loginservice.signIn(this.form.getRawValue()).subscribe(
      (res: any) => {
        console.log(res);
        this.loginservice.saveToken(res.accessToken);
        this.loginservice.saveUser(res.user);
        this.verificationService.getVendorInfo().subscribe((res) => {
          if (res.isVerificationFullfilled == false) {
            this.router.navigate(["/register/business-info"]);
          } else {
            this.router.navigate(["/"]);
          }
        });
      },
      (err) => {
        if (typeof err.error.message == typeof "x")
          Swal.fire(err.error.message, "", "error");
        else Swal.fire("يرجى التحقق من المعطيات", "", "error");
      }
    );
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }
}
