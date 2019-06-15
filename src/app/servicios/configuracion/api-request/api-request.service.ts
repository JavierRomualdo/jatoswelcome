import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType, HttpHeaders} from '@angular/common/http';
import { AppConfig } from 'src/app/app-config';
import { FileItem } from 'src/app/entidades/file/file-item';
import { UtilService } from '../util/util.service';

@Injectable({
  providedIn: 'root'
})
export class ApiRequestService {

  private headers = new HttpHeaders();

  constructor(
    private utilService: UtilService,
    private appConfig: AppConfig,
    private http: HttpClient
  ) { }

  appendAuthHeader(): HttpHeaders {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.headers;
  }

  get2(url: string): Promise<any> {
    return this.http.get(this.appConfig.baseApiPath + url, {
      headers: this.appendAuthHeader()
    }).toPromise()
    .then(resp => resp)
    .catch(err => this.utilService.handleError(err));
  }

  post2(url: string, objeto: Object): Promise<any> {
    return this.http.post(this.appConfig.baseApiPath + url, objeto, {
      headers: this.appendAuthHeader()
    }).toPromise()
    .then(resp => resp)
    .catch(err => this.utilService.handleError(err));
  }

  put2(url: string, objeto: Object): Promise<any> {
    return this.http.put(this.appConfig.baseApiPath + url, objeto, {
      headers: this.appendAuthHeader()
    }).toPromise()
    .then(resp => resp)
    .catch(err => this.utilService.handleError(err));
  }

  delete2(url: string): Promise<any> {
    return this.http.delete(this.appConfig.baseApiPath + url, {
      headers: this.appendAuthHeader()
    }).toPromise()
    .then(resp => resp)
    .catch(err => this.utilService.handleError(err));
  }

  // login
  login(url: string, objeto: Object): Promise<any> {
    return this.http.post(this.appConfig.baseApiPath + url, objeto, {
      headers: this.appendAuthHeader()
    }).toPromise()
    .then(resp => resp)
    .catch(err => this.utilService.handleError(err));
  }

  // Subir Imagenes
  onUpload(file: File, archivo: FileItem) {
    let exito: Boolean = false;
    const fd = new FormData();
    fd.append('image', file, file.name);
    this.http.post('https://us-central1-inmobiliaria-dd0b7.cloudfunctions.net/uploadFile', fd, {
      reportProgress: true,
      observe: 'events'
    }).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          archivo.progreso = Math.round(event.loaded / event.total * 100);
          console.log('Upload Progress: ' + archivo.progreso + '%');
        } else if (event.type === HttpEventType.Response) {
          console.log(event);
          exito = true;
        }
      }
    );
    return exito;
  }
}
