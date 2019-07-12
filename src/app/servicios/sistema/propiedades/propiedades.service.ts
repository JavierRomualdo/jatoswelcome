import { Injectable } from '@angular/core';
import { ApiRequestService } from '../../configuracion/api-request/api-request.service';
import { ToastrService } from 'ngx-toastr';
import { UtilService } from '../../configuracion/util/util.service';
import { LS } from 'src/app/constantes/app.constants';

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

  /** CASA */
  mostrarPropiedadCasa(parametro, contexto) {
    this.api.get2('casas/' + parametro).then(
      (data) => {
        if (data && data.extraInfo) {
          contexto.despuesDeMostrarPropiedadCasa(data.extraInfo);
        } else {
          this.toastr.warning(data.operacionMensaje, LS.TAG_AVISO);
          contexto.cargando = false;
        }
      }
    ).catch(err => this.utilService.handleError(err, contexto));
  }

  ingresarMensajeCasa(parametro, contexto) {
    this.api.post2('casamensaje', parametro).then(
      (data) => {
        if (data && data.extraInfo) {
          contexto.despuesIngresarMensajeCasa(data.extraInfo);
        } else {
          this.toastr.warning(data.operacionMensaje, LS.TAG_AVISO);
          contexto.cargando = false;
        }
      }
    ).catch(err => this.utilService.handleError(err, contexto));
  }

  /** COCHERA */
  mostrarPropiedadCochera(parametro, contexto) {
    this.api.get2('cocheras/' + parametro).then(
      (data) => {
        if (data && data.extraInfo) {
          contexto.despuesDeMostrarPropiedadCochera(data.extraInfo);
        } else {
          this.toastr.warning(data.operacionMensaje, LS.TAG_AVISO);
          contexto.cargando = false;
        }
      }
    ).catch(err => this.utilService.handleError(err, contexto));
  }

  ingresarMensajeCochera(parametro, contexto) {
    this.api.post2('cocheramensaje', parametro).then(
      (data) => {
        if (data && data.extraInfo) {
          contexto.despuesIngresarMensajeCochera(data.extraInfo);
        } else {
          this.toastr.warning(data.operacionMensaje, LS.TAG_AVISO);
          contexto.cargando = false;
        }
      }
    ).catch(err => this.utilService.handleError(err, contexto));
  }

  /** HABITACION */
  mostrarPropiedadHabitacion(parametro, contexto) {
    this.api.get2('habitaciones/' + parametro).then(
      (data) => {
        if (data && data.extraInfo) {
          contexto.despuesDeMostrarPropiedadHabitacion(data.extraInfo);
        } else {
          this.toastr.warning(data.operacionMensaje, LS.TAG_AVISO);
          contexto.cargando = false;
        }
      }
    ).catch(err => this.utilService.handleError(err, contexto));
  }

  ingresarMensajeHabitacion(parametro, contexto) {
    this.api.post2('habitacionmensaje', parametro).then(
      (data) => {
        if (data && data.extraInfo) {
          contexto.despuesIngresarMensajeHabitacion(data.extraInfo);
        } else {
          this.toastr.warning(data.operacionMensaje, LS.TAG_AVISO);
          contexto.cargando = false;
        }
      }
    ).catch(err => this.utilService.handleError(err, contexto));
  }

  /** LOCALES */
  mostrarPropiedadLocal(parametro, contexto) {
    this.api.get2('locales/' + parametro).then(
      (data) => {
        if (data && data.extraInfo) {
          contexto.despuesDeMostrarPropiedadLocal(data.extraInfo);
        } else {
          this.toastr.warning(data.operacionMensaje, LS.TAG_AVISO);
          contexto.cargando = false;
        }
      }
    ).catch(err => this.utilService.handleError(err, contexto));
  }

  ingresarMensajeLocal(parametro, contexto) {
    this.api.post2('localmensaje', parametro).then(
      (data) => {
        if (data && data.extraInfo) {
          contexto.despuesIngresarMensajeLocal(data.extraInfo);
        } else {
          this.toastr.warning(data.operacionMensaje, LS.TAG_AVISO);
          contexto.cargando = false;
        }
      }
    ).catch(err => this.utilService.handleError(err, contexto));
  }

  /** LOTE */
  mostrarPropiedadLote(parametro, contexto) {
    this.api.get2('lotes/' + parametro).then(
      (data) => {
        if (data && data.extraInfo) {
          contexto.despuesDeMostrarPropiedadLote(data.extraInfo);
        } else {
          this.toastr.warning(data.operacionMensaje, LS.TAG_AVISO);
          contexto.cargando = false;
        }
      }
    ).catch(err => this.utilService.handleError(err, contexto));
  }

  ingresarMensajeLote(parametro, contexto) {
    this.api.post2('lotemensaje', parametro).then(
      (data) => {
        if (data && data.extraInfo) {
          contexto.despuesIngresarMensajeLote(data.extraInfo);
        } else {
          this.toastr.warning(data.operacionMensaje, LS.TAG_AVISO);
          contexto.cargando = false;
        }
      }
    ).catch(err => this.utilService.handleError(err, contexto));
  }
}
