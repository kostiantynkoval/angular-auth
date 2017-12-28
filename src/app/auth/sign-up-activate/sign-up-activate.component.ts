import { Component, OnInit, ViewChild  } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { PHONECODES } from '../phone codes/phone-codes';
import { PhoneCodes } from '../phone codes/phone-codes-model';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up-activate',
  templateUrl: './sign-up-activate.component.html',
  styleUrls: ['./sign-up-activate.component.sass']
})
export class SignUpActivateComponent implements OnInit {

  rForm: FormGroup;
  post:any;                     // A property for our submitted form
  firstname:string = '';
  lastname:string = '';
  phonenumber: string = '';
  email: string = '';
  phoneCodes: PhoneCodes[];
  phoneCode: string;
  isDropdownActive: boolean = false;
  constructor(private formBuilder: FormBuilder) {
    this.phoneCodes = PHONECODES;
    this.phoneCode = 'US +1';
    this.rForm = formBuilder.group({
      'firstname' : [null, Validators.required],
      'lastname' : [null, Validators.required],
      'phonenumber' : [null, Validators.compose([Validators.required, Validators.minLength(9), Validators.maxLength(12), Validators.pattern(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/)])],
      'email' : [null, Validators.compose([Validators.required, Validators.email])],

      'validate' : ''
    });
  }

  @ViewChild('autoShownModal') autoShownModal: ModalDirective;
  isModalShown: boolean = false;

  showModal(): void {
    this.isModalShown = true;
  }

  hideModal(): void {
    this.autoShownModal.hide();
  }

  onHidden(): void {
    this.isModalShown = false;
  }

  handleDropdown():void {
    this.isDropdownActive = !this.isDropdownActive;
  }

  getCountryCode(country): boolean {
    this.phoneCode = country.code + ' ' + country.dial_code;
    this.isDropdownActive = false;
    return false;
  }

  addPost(post) {
    console.log(post);
  }

  ngOnInit() {
    this.showModal();
    console.log('codes', this.phoneCodes);
  }
}
