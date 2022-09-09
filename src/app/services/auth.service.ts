import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { environment } from '../../environments/environment';
import { Observable, throwError } from "rxjs";
import { IResponse } from '../interfaces/responce.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private httpClient:HttpClient) { }

  loginByEmail(form:any):Observable<IResponse>{
    console.log(form)
    //const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded'});
    
    let URL = environment.API_URL + 'api/login'
    return this.httpClient.post<IResponse>(URL, form);
  }


  handleError(error: HttpErrorResponse) {
    return throwError(error);
}

}
