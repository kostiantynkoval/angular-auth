import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import { User } from '../models/user/user-model';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class AuthService {

  private url: string = "http://travelmateapi-staging.azurewebsites.net:80";

  constructor(private http: HttpClient) {
  }

  /** POST: add a new hero to the server */
  registerUser(user) {
    const data: User = {
      weChatId: 'string',
      profile: {
        firstName: user.firstname,
        lastName: user.lastname,
        phone: user.phoneNumber,
        phonePrefix: user.phonePrefix,
        email: user.email,
        dependentName: '',
        tagIds: [
          null
        ],
        currencyId: null,
        imageUrl: '',
        languageIsEnglish: true
      },
      subscription: {
        weChatTransactionNumber: 'string',
        invitationCode: '',
        membershipMonths: null,
        amountUSD: null
      }
    };

    return this.http.post(this.url + '/user/register', data, httpOptions);
  }

  /** Send and Verify Authentication Code sent by SMS */
  sendSMS(data) {
    return this.http.post(this.url + '/user/sendsms', data, httpOptions);
  }
  checkCode(data) {
    return this.http.post(this.url + '/user/confirmsms', data, httpOptions);
  }

  /** Send Credit Card Credentials */
  sendCard(data, token) {
    return this.http.post(`${this.url}/user/addcard?token=${token}`, data, httpOptions);
  }
}
