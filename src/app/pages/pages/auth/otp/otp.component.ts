import { Component, OnInit } from '@angular/core';
import { RegisterComponent } from '../register/register.component';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { HttpClient } from '@angular/common/http';
import { Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'vex-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent implements OnInit {
  otp:string;

  constructor( 
    private router: Router,
    private http: HttpClient,
    private dialog: MatDialog)
   { }

  ngOnInit(): void {
    const otp = ['', Validators.required]
  }

  change(){
    const confirmDialog= this.dialog.open(ConfirmDialogComponent,{
      data:{
        title:'Confirm Change Email',
        message:'Are you sure...'
      }
    });
    confirmDialog.afterClosed().subscribe(result=>{
      if(result === true){
        this.router.navigate(['/register']);
     //   this.http.delete("http://localhost:3000/api/auth/register")
      }
    });
  }

  submit(): void{
    const data = this.otp.valueOf();
    this.http.put(environment.apiUrl+'auth/register', data)
    .subscribe( (res) =>{
      Swal.fire('شكرا لك ... ، لقد قدمت بنجاح!', 'success') 
     localStorage.setItem('email',data);
      this.router.navigate(['/otp']);
    }, (error)=>{
      console.log(error)
      Swal.fire('Email exists', error.message , 'error')

    }
    );
  }


}
