import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {catchError, map, tap} from 'rxjs/operators';

import { User } from '../models/user/user-model';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class AuthService {

  private url: string = "http://travelmateapi-staging.azurewebsites.net:80";

  constructor(private http: HttpClient) {
  }

  registerUser(user): Observable<User> {
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
    /** POST: add a new hero to the server */

    return this.http.post(this.url + '/user/register', data, httpOptions).pipe(
      catchError(this.handleError('register User'))
    );
  }

  /** Send and Verify Authentication Code sent by SMS */
  sendSMS(data) {
    return this.http.post(this.url + '/user/sendsms', data, httpOptions).pipe(
      catchError(this.handleError('send code by SMS'))
    );
  }
  checkCode(data) {
    return this.http.post(this.url + '/user/confirmsms', data, httpOptions).pipe(
      catchError(this.handleError('confirm code from SMS'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}

/*    addHero (hero: Hero): Observable<Hero>*/
