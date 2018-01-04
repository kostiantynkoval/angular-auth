import { Component, OnInit, ViewChild  } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { PHONECODES } from '../../models/phone codes/phone-codes';
import { PhoneCodes } from '../../models/phone codes/phone-codes-model';

import { AuthService } from '../../services/auth.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

const INCOMEOPTIONSVALUES = [
  {id: 1, value: "LESS THAN $250.000 USD"},
  {id: 2, value: "$250.000 - $1M USD"},
  {id: 3, value: "$1M - $5M USD"},
  {id: 4, value: "$5M - $10M USD"},
  {id: 5, value: "$10M - $20M USD"},
  {id: 6, value: "$20M+ USD"}
];
const currentYear = parseInt(new Date().getFullYear().toString().substr(-2));

@Component({
  selector: 'app-sign-up-apply',
  templateUrl: './sign-up-apply.component.html',
  styleUrls: ['./sign-up-apply.component.sass']
})
export class SignUpApplyComponent implements OnInit {

  // Verification Code Digits
  d1;
  d2;
  d3;
  d4;

  // User Object
  loggedUser;

  // Modal Step1: Add user's data
  rForm: FormGroup;
  firstname:string = '';
  lastname:string = '';
  phonenumber: string = '';
  email: string = '';
  phoneCodes: PhoneCodes[];
  phoneCode: string;
  phonePrefix: string;
  isDropdownActive: boolean = false;

  // Modal Annual Income Values
  iForm: FormGroup;
  incomeOptionsValues: object;
  companyname: string;
  companyposition: string;

  // Modal Add Credit Card
  cForm: FormGroup;
  billingAddress1: string;
  billingAddress2: string;
  cardNumber: string;
  expMonth: string;
  expYear: string;
  cvv: string;
  addCardResponseStatus: number;
  addCardResponseMessage: string;

  // Modal Error
  errorMessage: string;


  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
    this.phoneCodes = PHONECODES;
    this.phoneCode = 'UA +380';
    this.phonePrefix = '+380';
    this.incomeOptionsValues = INCOMEOPTIONSVALUES;
    this.rForm = formBuilder.group({
      'firstname' : [null, Validators.required],
      'lastname' : [null, Validators.required],
      'phonenumber' : [null, Validators.compose([Validators.required, Validators.minLength(9), Validators.maxLength(12), Validators.pattern(/^(?:[0-9](?:\x20|-)?){6,14}[0-9]$/)])],
      'email' : [null, Validators.compose([Validators.required, Validators.pattern(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/)], )]
    });
    this.iForm = formBuilder.group({
      'companyname' : [null, Validators.required],
      'companyposition' : [null, Validators.required],
      'incomeOptionsValues' : [null, Validators.required]
    });
    this.cForm = formBuilder.group({
      'billingAddress1' : [null, Validators.required],
      'billingAddress2' : [null],
      'cardNumber' : [null, Validators.compose([Validators.required, Validators.minLength(15), Validators.maxLength(16), Validators.pattern(/^[0-9]{15,16}$/)])],
      'expMonth' : [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(2), Validators.pattern(/^[0-9]{1,2}$/), Validators.min(1), Validators.max(12)])],
      'expYear' : [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(2), Validators.pattern(/^[0-9]{1,2}$/), Validators.min(currentYear), Validators.max(currentYear + 10)])],
      'cvv' : [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(3), Validators.pattern(/^[0-9]{3}$/)])]
    });
  }

  @ViewChild('autoShownStep1Modal') autoShownModal: ModalDirective;
  isStep1ModalShown: boolean = false;

  @ViewChild('autoShownCodeModal') autoShownCodeModal: ModalDirective;
  isCodeModalShown: boolean = false;

  @ViewChild('autoShownSuccessModal') autoShownSuccessModal: ModalDirective;
  isSuccessModalShown: boolean = false;

  @ViewChild('autoShownIncomeModal') autoShownIncomeModal: ModalDirective;
  isIncomeModalShown: boolean = false;

  @ViewChild('autoShownCardModal') autoShownCardModal: ModalDirective;
  isCardModalShown: boolean = false;

  @ViewChild('autoShownFinalModal') autoShownFinalModal: ModalDirective;
  isFinalModalShown: boolean = false;

  @ViewChild('autoShownErrorModal') autoShownErrorModal: ModalDirective;
  isErrorModalShown: boolean = false;

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
    this.hideStep1Modal();
    this.authService.registerUser(user).subscribe(res => {
      this.loggedUser = res;
      console.log('USER: ', this.loggedUser);
      this.sendSMSwithCode();
    }, (err) => {
      console.log('err', err);
      this.errorMessage = "Status: " + err.name;
      this.showErrorModal();
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
    }, (err) => {
      console.log('err', err);
      this.errorMessage = "Status: " + err.name;
      this.showErrorModal();
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
    }, (err) => {
      console.log('err', err);
      this.errorMessage = "Status: " + err.name;
      this.hideCodeModal();
      this.showErrorModal();
    });
  }


  /* Functions handle Code Verification Success Modal Window */

  showSuccessModal(): void {
    this.isSuccessModalShown = true;
    setTimeout(this.hideSuccessModal, 1300, this);
  }

  hideSuccessModal(that): void {
    console.log('hideSuccessModal run that', that);
    if (that.isSuccessModalShown === true) {
      that.autoShownSuccessModal.hide();
    }
  }

  onSuccessHidden(): void {
    this.isSuccessModalShown = false;
    console.log('onSuccessHidden run', this);
    this.showIncomeModal();
  }


  /* Functions handle Add Company Name And Annual Income Modal Window */

  showIncomeModal(): void {
    this.isIncomeModalShown = true;
  }

  hideIncomeModal(): void {
    this.autoShownIncomeModal.hide();
  }

  onIncomeHidden(): void {
    this.isIncomeModalShown = false;
  }

  addIncome(post) {
    console.log(post);
    this.hideIncomeModal();
    this.showCardModal();
  }


  /* Functions handle Add Credit Card Modal Window */

  showCardModal(): void {
    this.isCardModalShown = true;
  }

  hideCardModal(): void {
    this.autoShownCardModal.hide();
  }

  onCardHidden(): void {
    this.isCardModalShown = false;
  }

  addCard(post) {
    console.log(post);
    const data = {
      type: "AX",
      nameOnCard: `${this.loggedUser.firstName} ${this.loggedUser.lastName}`,
      cardNumber: post.cardNumber,
      expirationMonth: parseInt(post.expMonth),
      expirationYear: parseInt(`20${post.expYear}`),
      cvv: post.cvv
    };
    this.authService.sendCard(data, this.loggedUser.token).subscribe((res: any) => {
      console.log('res', res)
      this.addCardResponseStatus = res.status;
      this.addCardResponseMessage = res.message;
      this.hideCardModal();
      this.showFinalModal();
    }, (err) => {
      console.log('err', err);
      if (err.error && err.error === "Your card number is incorrect.") {
        this.addCardResponseStatus = err.status;
        this.addCardResponseMessage = err.error;
        this.hideCardModal();
        this.showFinalModal();
      } else {
        this.errorMessage = "Status: " + err.name;
        this.hideCardModal();
        this.showErrorModal();
      }
    });
  }

  /* Functions handle Final Success Modal Window */

  showFinalModal(): void {
    this.isFinalModalShown = true;
  }

  hideFinalModal(): void {
    this.autoShownFinalModal.hide();
  }

  onFinalHidden(): void {
    this.isFinalModalShown = false;
  }

  /* Functions handle Error Modal Window */

  showErrorModal(): void {
    this.isErrorModalShown = true;
  }

  hideErrorModal(): void {
    this.autoShownErrorModal.hide();
  }

  onErrorHidden(): void {
    this.isErrorModalShown = false;
  }

}

