import { Component, OnInit } from '@angular/core';
import { FriendSuggestion } from '../social.component';
import { friendSuggestions } from '../../../../../static-data/friend-suggestions';
import { fadeInUp400ms } from '../../../../../@vex/animations/fade-in-up.animation';
import { fadeInRight400ms } from '../../../../../@vex/animations/fade-in-right.animation';
import { scaleIn400ms } from '../../../../../@vex/animations/scale-in.animation';
import { stagger40ms } from '../../../../../@vex/animations/stagger.animation';
import icMail from '@iconify/icons-ic/twotone-mail';
import icAccessTime from '@iconify/icons-ic/twotone-access-time';
import icAdd from '@iconify/icons-ic/twotone-add';
import icWhatshot from '@iconify/icons-ic/twotone-whatshot';
import icWork from '@iconify/icons-ic/twotone-work';
import icPhone from '@iconify/icons-ic/twotone-phone';
import icPersonAdd from '@iconify/icons-ic/twotone-person-add';
import icCheck from '@iconify/icons-ic/twotone-check';
import { SocialService } from '../social.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { environment } from 'src/environments/environment';
import { FileService } from 'src/app/shared/services/file.service';

@Component({
  selector: 'vex-social-profile',
  templateUrl: './social-profile.component.html',
  styleUrls: ['./social-profile.component.scss'],
  animations: [
    fadeInUp400ms,
    fadeInRight400ms,
    scaleIn400ms,
    stagger40ms
  ]
})
export class SocialProfileComponent implements OnInit {
  connectedUser: any;
  vendor: any;
  formPassword = new FormGroup({
    oldPassword: new FormControl(),
    newPassword: new FormControl()
  });

  formBasicInfo = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    phone: new FormControl(),
    dateBirth: new FormControl(),
  });

  formBusinessInfo = new FormGroup({
    businessName: new FormControl(),
    numberCompany: new FormControl(),
    storeDescription: new FormControl(),
    storeName: new FormControl(),
    businessType: new FormControl(),
    adressLine: new FormControl(),
    adressLine2: new FormControl(),
    city: new FormControl(),
    postalCode: new FormControl(),
  });
  updatedDocument: {
    frontIdentity: null,
    backIdentity: null,
    statement: null
  }


  firstFormGroup: FormGroup;
  suggestions = friendSuggestions;

  server: string;

  icWork = icWork;
  icPhone = icPhone;
  icPersonAdd = icPersonAdd;
  icCheck = icCheck;
  icMail = icMail;
  icAccessTime = icAccessTime;
  icAdd = icAdd;
  icWhatshot = icWhatshot;
  frontImage: string | ArrayBuffer;
  backImage: string | ArrayBuffer;
  statementImage: string | ArrayBuffer;

  constructor(private socialService: SocialService, private route: ActivatedRoute, private _formBuilder: FormBuilder,
    private fileService: FileService) {
    this.server = environment.baseUrl;
    this.route.queryParams
      .subscribe(params => {
      }
      );
    this.connectedUser = JSON.parse(localStorage.getItem('user_data') as string)?.id;
    console.log(this.connectedUser)
  }

  onFrontImageInput(files: FileList) {
    let reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        this.frontImage = reader.result;
      }
    };
    reader.readAsDataURL(files[0]);
  }

  onBackImageInput(files: FileList) {
    let reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        this.backImage = reader.result;
      }
    };
    reader.readAsDataURL(files[0]);
  }

  onStatementImageInput(files: FileList) {
    let reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        this.statementImage = reader.result;
      }
    };
    reader.readAsDataURL(files[0]);
  }

  ngOnInit() {
    this.socialService.getvendorById(this.connectedUser).subscribe(
      res => {
        this.vendor = res;
        this.formBasicInfo = this._formBuilder.group({
          firstName: [this.vendor.firstName, Validators.required],
          lastName: [this.vendor.lastName, Validators.required],
          phone: [this.vendor.phone, Validators.required],
          dateBirth: [formatDate(this.vendor.dateBirth, 'yyyy-MM-dd', 'en'), Validators.required],
        });


        this.formBusinessInfo = this._formBuilder.group({
          businessName: [this.vendor.businessInfo.businessName, Validators.required],
          numberCompany: [this.vendor.businessInfo.numberCompany, Validators.required],
          storeDescription: [this.vendor.businessInfo.storeDescription, Validators.required],
          storeName: [this.vendor.businessInfo.storeName, Validators.required],
          businessType: [this.vendor.businessType, Validators.required],
          adressLine: [this.vendor.businessAdress.adressLine, Validators.required],
          adressLine2: [this.vendor.businessAdress.adressLine2, Validators.required],
          city: [this.vendor.businessAdress.city, Validators.required],
          postalCode: [this.vendor.businessAdress.postalCode, Validators.required],
        });

      }
    )
    this.firstFormGroup = this._formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
    });


  }

  async updateDocuments() {

    Swal.fire({
      title: 'هل أنت متأكد؟',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#072F61',
      reverseButtons: true,
      cancelButtonColor: '#92969C',
      cancelButtonText: 'إلغاء',
      confirmButtonText: 'نعم ، قم بتحديث المستندات'
    }).then(async (result) => {
      if (result.isConfirmed) {
        let response1;
        let response2;
        let response3;
        if (this.frontImage) {
          response1 = await this.fileService.uploadFile(this.frontImage).toPromise();

        }

        if (this.backImage) {
          response2 = await this.fileService.uploadFile(this.backImage).toPromise();

        }

        if (this.statementImage) {
          response3 = await this.fileService.uploadFile(this.statementImage).toPromise();

        }

        const updatedDocument = {
          identityFront: response1?.id,
          identityBack: response2?.id,
          statement: response3?.id
        }

        return this.socialService.updateDocuments(this.connectedUser, updatedDocument).subscribe(
          res => Swal.fire({
            icon: 'success',
            title: 'تم تحديث المستندات بنجاح',
            showConfirmButton: false,
            timer: 1500
          })
        )
      }
    })

  }
  updateVendorPerInfo() {

    Swal.fire({
      title: 'هل أنت متأكد؟',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#072F61',
      reverseButtons: true,
      cancelButtonColor: '#92969C',
      cancelButtonText: 'إلغاء',
      confirmButtonText: 'نعم '
    }).then((result) => {
      if (result.isConfirmed) {
        this.socialService.updatePerInfo(this.connectedUser, this.formBasicInfo.getRawValue())
          .subscribe(
            res =>
              Swal.fire({
                icon: 'success',
                title: 'تم تغيير  معلومات الشخصية ',
                showConfirmButton: false,
                timer: 1500
              })
            , error => {
              Swal.fire({
                icon: 'error',
                title: error.error.message,
                showConfirmButton: false,
                timer: 1500
              });
              return;
            }
          )
      }
    })



  }
  updateVendorBusInfo() {

    Swal.fire({
      title: 'هل أنت متأكد؟',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#072F61',
      reverseButtons: true,
      cancelButtonColor: '#92969C',
      cancelButtonText: 'إلغاء',
      confirmButtonText: 'نعم '
    }).then((result) => {
      if (result.isConfirmed) {
        this.socialService.updateBusInfo(this.connectedUser,
          this.formBusinessInfo.getRawValue())
          .subscribe(
            res =>
              Swal.fire({
                icon: 'success',
                title: 'تم تغيير معلومات العمل ',
                showConfirmButton: false,
                timer: 1500
              })

            , error => {
              if (error.status == 400)
                Swal.fire({
                  icon: 'error',
                  title: 'الرجاء التثبت من المعلومات',
                  showConfirmButton: false,
                  timer: 1500
                });
              return;
            }
          )
      }
    })


  }
  changePassword() {

    Swal.fire({
      title: 'هل أنت متأكد؟',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#072F61',
      reverseButtons: true,
      cancelButtonColor: '#92969C',
      cancelButtonText: 'إلغاء',
      confirmButtonText: 'نعم '
    }).then((result) => {
      if (result.isConfirmed) {

        this.socialService.changePassword(this.firstFormGroup.getRawValue())
          .subscribe(
            res => {
              Swal.fire({
                icon: 'success',
                title: 'تم تغير كلمةالسر ',
                showConfirmButton: false,
                timer: 1500
              })
              this.socialService.logout()
            }, error => {
              Swal.fire({
                icon: 'error',
                title: error.error.message,
                showConfirmButton: false,
                timer: 1500
              });
              return;
            }
          )
      }
    })

  }
  addFriend(friend: FriendSuggestion) {
    friend.added = true;
  }

  removeFriend(friend: FriendSuggestion) {
    friend.added = false;
  }

  trackByName(index: number, friend: FriendSuggestion) {
    return friend.name;
  }
}
