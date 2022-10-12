import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { environment } from '../../environments/environment';
import { IResponseInversion, IResponseInversiones } from './../interfaces/iresponse-inversion.interface';
import { Observable, throwError } from "rxjs";
import { UserData } from '../providers/user-data';
import { IResponseTipoInversion } from './../interfaces/iresponse-tipoinversion.interface';
import { IResponseDiasInversion } from './../interfaces/iresponse-diasinversion.interface';

@Injectable({
  providedIn: 'root'
})
export class InversionService {

  access_token = '';

  constructor(private http: HttpClient, public userData: UserData) { 
    userData.getToken().then( token => {
      console.log(token);
      this.access_token = token;
    });
  }

  getInversiones():Observable<IResponseInversiones> {
    let URL = environment.API_URL + 'api/inversion'
    
    const headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.access_token}`
    });
    return this.http.get<IResponseInversiones>(URL, {headers});
  }

  getInversion(id: number): Observable<IResponseInversion> {
    let URL = environment.API_URL + `api/inversion/${id}`
    
    const headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.access_token}`
    });
    return this.http.get<IResponseInversion>(URL, {headers});
  }

  postCreateInversion(form:any):Observable<any>{
    console.log(form)
    const headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.access_token}`
    });
    
    let URL = environment.API_URL + 'api/inversion'
    return this.http.post<any>(URL, form, {headers});
  }

  getTiposInversiones():Observable<IResponseTipoInversion> {
    let URL = environment.API_URL + 'api/tiposinversion'
    
    const headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.access_token}`
    });
    return this.http.get<IResponseTipoInversion>(URL, {headers});
  }

  getDiasInversiones():Observable<IResponseDiasInversion> {
    let URL = environment.API_URL + 'api/diasinversion'
    
    const headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.access_token}`
    });
    return this.http.get<IResponseDiasInversion>(URL, {headers});
  }
}
