import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import icVisibility from '@iconify/icons-ic/twotone-visibility';
import icVisibilityOff from '@iconify/icons-ic/twotone-visibility-off';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fadeInUp400ms } from '../../../../../@vex/animations/fade-in-up.animation';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { LoginComponent } from '../login/login.component';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'vex-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: [
    fadeInUp400ms
  ]
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  inputType = 'password';
  visible = false;

  icVisibility = icVisibility;
  icVisibilityOff = icVisibilityOff;

  constructor(private router: Router,
              private fb: FormBuilder,
              private http: HttpClient,
              private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required],
    });
  }

  send() {
    this.router.navigate(['/']);
  }

  toggleVisibility() {
    if (this.visible) {
      this.inputType = 'password';
      this.visible = false;
      this.cd.markForCheck();
    } else {
      this.inputType = 'text';
      this.visible = true;
      this.cd.markForCheck();
    }
  }
  submit(): void{ 
    const data = this.form.getRawValue()
    delete data.passwordConfirm
    this.http.post(environment.apiUrl+'auth/register/vendor', data)
    .subscribe( (res) =>{
      Swal.fire('شكرا لك ...  لقد قدمت بنجاح!', 'success') 
     localStorage.setItem('email',data.email);
      this.router.navigate(['/login']);
    }, (error)=>{
      console.log(error)
      if(error.status == 400) Swal.fire('يرجى التحقق من المعلومات الخاصة بك' , '' , 'error')
      

    }
    );
  }

  
}
