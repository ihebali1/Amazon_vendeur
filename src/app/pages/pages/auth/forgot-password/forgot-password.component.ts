import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fadeInUp400ms } from '../../../../../@vex/animations/fade-in-up.animation';
import icMail from '@iconify/icons-ic/twotone-mail';
import { ForgetPasswordService } from './forget-password.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'vex-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  animations: [fadeInUp400ms]
})
export class ForgotPasswordComponent implements OnInit {

  form = this.fb.group({
    email: [null, Validators.required]
  });

  icMail = icMail;

  constructor(
    private forgetService: ForgetPasswordService,
     private route:ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
  }
  forgetPassword(){
    this.forgetService.forgotPassword(this.form.getRawValue())
    .subscribe
    (
      res=> {
     Swal.fire({
     icon: 'success',
     title: 'تم  ',
     showConfirmButton: false,
     timer: 1500
   }),this.router.navigate(['/login'])})}

  send() {
    this.router.navigate(['/']);
  }
}
