import { Component, OnInit, ViewChild  } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { PHONECODES } from '../../models/phone codes/phone-codes';
import { PhoneCodes } from '../../models/phone codes/phone-codes-model';

import { AuthService } from '../../services/auth.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-sign-up-activate',
  templateUrl: './sign-up-activate.component.html',
  styleUrls: ['./sign-up-activate.component.sass']
})
export class SignUpActivateComponent implements OnInit {

  d1;
  d2;
  d3;
  d4;
  loggedUser;
  rForm: FormGroup;
  codeForm: FormGroup;
  firstname:string = '';
  lastname:string = '';
  phonenumber: string = '';
  email: string = '';
  phoneCodes: PhoneCodes[];
  phoneCode: string;
  phonePrefix: string;
  isDropdownActive: boolean = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
    this.phoneCodes = PHONECODES;
    this.phoneCode = 'US +1';
    this.phonePrefix = '+1';
    this.rForm = formBuilder.group({
      'firstname' : [null, Validators.required],
      'lastname' : [null, Validators.required],
      'phonenumber' : [null, Validators.compose([Validators.required, Validators.minLength(9), Validators.maxLength(12), Validators.pattern(/^(?:[0-9](?:\x20|-)?){6,14}[0-9]$/)])],
      'email' : [null, Validators.compose([Validators.required, Validators.pattern(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/)], )]
    });
  }

  @ViewChild('autoShownStep1Modal') autoShownModal: ModalDirective;
  isStep1ModalShown: boolean = false;

  @ViewChild('autoShownCodeModal') autoShownCodeModal: ModalDirective;
  isCodeModalShown: boolean = false;

  @ViewChild('autoShownSuccessModal') autoShownSuccessModal: ModalDirective;
  isSuccessModalShown: boolean = false;

  ngOnInit() {
    this.showStep1Modal();
  }

  /* Functions hadle Step1 Modal Window */
  showStep1Modal(): void {
    this.isStep1ModalShown = true;
  }

  hideStep1Modal(): void {
    this.autoShownModal.hide();
  }

  onStep1Hidden(): void {
    this.isStep1ModalShown = false;
  }

  handleDropdown(): void {
    this.isDropdownActive = !this.isDropdownActive;
  }

  getCountryCode(country): boolean {
    this.phoneCode = country.code + ' ' + country.dial_code;
    this.phonePrefix = country.dial_code;
    this.isDropdownActive = false;
    return false;
  }

  addPost(post) {
    const user = {
      firstname: post.firstname,
      lastname: post.lastname,
      email: post.email,
      phoneNumber: post.phonenumber,
      phonePrefix: this.phonePrefix
    };
    this.authService.registerUser(user).subscribe(res => {
      this.loggedUser = res;
      console.log('USER: ', this.loggedUser);
      this.hideStep1Modal();
      this.sendSMSwithCode();
    });
  }

  sendSMSwithCode() {
    console.log(this.d1);
    const data = {
      weChatId: this.loggedUser.weChatId,
      prefix: this.loggedUser.phonePrefix,
      phone: this.loggedUser.phone,
      language: this.loggedUser.languageIsEnglish
    };
    this.authService.sendSMS(data).subscribe((res) => {
      console.log('SMS Sent', res);
      this.showCodeModal();
    });
  }


  /* Functions hadle Code Verification Modal Window */

  showCodeModal(): void {
    this.isCodeModalShown = true;
  }

  hideCodeModal(): void {
    this.autoShownCodeModal.hide();
  }

  onCodeHidden(): void {
    this.isCodeModalShown = false;
  }

  handleDigit(e, item) {
    if (( e.keyCode >= 48 && e.keyCode <= 57 ) || ( e.keyCode >= 96 && e.keyCode <= 105 ) ) {
      if (item != null) {
        item.focus();
      } else {
        this.sendCode();
      }
    } else {
      e.target.value = "";
      return false;
    }
  }

  sendCode() {
    const data = {
      weChatId: this.loggedUser.weChatId,
      prefix: this.loggedUser.phonePrefix,
      phone: this.loggedUser.phone,
      digits: `${this.d1}${this.d2}${this.d3}${this.d4}`,
      language: this.loggedUser.languageIsEnglish
    };
    this.authService.checkCode(data).subscribe((res) => {
      if (res !== null) {
        this.hideCodeModal();
        this.showSuccessModal();
      } else {
        document.getElementById('divider').style.borderBottom = '1px solid red';
      }
    });
  }


  /* Functions handle Code Verification Success Modal Window */

  showSuccessModal(): void {
    this.isSuccessModalShown = true;
  }

  hideSuccessModal(): void {
    this.autoShownSuccessModal.hide();
  }

  onSuccessHidden(): void {
    this.isSuccessModalShown = false;
  }


}
