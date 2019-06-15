import { Injectable } from '@angular/core';
import { ApiRequestService } from '../../configuracion/api-request/api-request.service';
import { ToastrService } from 'ngx-toastr';
import { UtilService } from '../../configuracion/util/util.service';

@Injectable({
  providedIn: 'root'
})
export class PropiedadesService {

  constructor(
    private api: ApiRequestService,
    private utilService: UtilService,
    public toastr: ToastrService
  ) { }

  busquedaPropiedad(parametro, contexto) {
    this.api.post2('busquedaPropiedad', parametro).then(
      (data) => {
        contexto.despuesDeBusquedaPropiedad(data);
      }
    ).catch(err => this.utilService.handleError(err, contexto));
  }
}
