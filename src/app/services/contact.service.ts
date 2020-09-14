import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }
  private api = 'https://mailthis.to/redarebouh@outlook.com';
  postMessage(input: any) {
    console.log(input);
    return this.http.post(this.api, input, { responseType: 'text'}).pipe(
      map(
        (response) => {
          return response;
        },
        (error: any) => {
          return error;
        }
      )
    );
  }
  
  sendEmail(data) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    
    return  this.http.post('http://localhost:1337/email/',data, httpOptions).pipe(
                    catchError(this.handleError)); 
  }
  public handleError(error: HttpErrorResponse | any) {
    let errMsg: string;

    if(error.error instanceof ErrorEvent) {
      errMsg = error.error.message;
    }
    else {
      errMsg = `${error.status} - ${error.statusText || ''} ${error.error}`;
   }

   return throwError(errMsg);
  }

}
