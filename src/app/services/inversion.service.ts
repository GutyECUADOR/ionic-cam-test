import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { environment } from '../../environments/environment';
import { IResponseInversion } from './../interfaces/iresponse-inversion.interface';
import { Observable, throwError } from "rxjs";
import { UserData } from '../providers/user-data';

@Injectable({
  providedIn: 'root'
})
export class InversionService {

  access_token = '';

  constructor(private http: HttpClient, public userData: UserData) { 
    userData.getToken().then( token => {
      this.access_token = token;
    });
  }

  getInversiones():Observable<IResponseInversion> {
    let URL = environment.API_URL + 'api/inversion'
    
    const headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.access_token}`
    });
    return this.http.get<IResponseInversion>(URL, {headers});
  }

  getInversion(id: number): Observable<IResponseInversion> {
    let URL = environment.API_URL + `api/inversion/${id}`
    
    const headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.access_token}`
    });
    return this.http.get<IResponseInversion>(URL, {headers});
  }
}
