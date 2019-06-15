import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfig } from 'src/app/app-config';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ArchivoService {

  headers = new HttpHeaders();
  constructor(
    private http: HttpClient,
    private router: Router,
    private appConfig: AppConfig
  ) { }

  appendAuthHeader(): HttpHeaders {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.headers;
  }

  postPdf(url: string, objeto: Object): Promise<any> {
    return this.http.post(this.appConfig.baseApiPath + url, objeto, {
      headers: this.appendAuthHeader()
    }).toPromise()
    .catch(err => this.handleError(err));
  }

  handleError(error: any): Promise<any> {
    if (error.status === 401 || error.status === 403) {
        sessionStorage.clear();
        localStorage.clear();
        this.router.navigate(['login']);
    }
    if (error.status === 404) {
      console.error('página solicitada no se encuentra');
    }
    return Promise.reject(error.message || error);
  }
}
