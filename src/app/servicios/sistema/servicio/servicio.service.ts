import { Injectable } from '@angular/core';
import { ApiRequestService } from '../../configuracion/api-request/api-request.service';
import { UtilService } from '../../configuracion/util/util.service';
import { ToastrService } from 'ngx-toastr';
import { LS } from 'src/app/constantes/app.constants';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  constructor(
    private api: ApiRequestService,
    private utilService: UtilService,
    private toastr: ToastrService
  ) { }

  listarServicios(parametro, contexto) {
    this.api.post2('listarServicios', parametro).then(
      (data) => {
        if (data && data.extraInfo) {
          contexto.despuesDeListarServicios(data.extraInfo);
        } else {
          this.toastr.warning(data.operacionMensaje, LS.TAG_AVISO);
          contexto.despuesDeListarServicios([]);
        }
      }
    ).catch(err => this.utilService.handleError(err, contexto));
  }

  ingresarServicio(parametro, contexto) {
    this.api.post2('servicios', parametro).then(
      (data) => {
        if (data && data.extraInfo) {
          this.toastr.success(data.operacionMensaje, LS.TAG_EXITO);
          contexto.despuesDeIngresarServicio(data.extraInfo);
        } else {
          this.toastr.warning(data.operacionMensaje, LS.TAG_AVISO);
          contexto.cargando = false;
        }
      }
    ).catch(err => this.utilService.handleError(err, contexto));
  }

  modificarServicio(parametro, contexto) {
    this.api.put2('servicios/' + parametro.id, parametro).then(
      (data) => {
        if (data && data.extraInfo) {
          this.toastr.success(data.operacionMensaje, LS.TAG_EXITO);
          contexto.despuesDeModificarServicio(data.extraInfo);
        } else {
          this.toastr.warning(data.operacionMensaje, LS.TAG_AVISO);
          contexto.cargando = false;
        }
      }
    ).catch(err => this.utilService.handleError(err, contexto));
  }

  cambiarEstadoServicio(parametro, contexto) {
    this.api.post2('cambiarEstadoServicio', parametro).then(
      (data) => {
        if (data && data.extraInfo) {
          this.toastr.success(data.operacionMensaje, LS.TAG_EXITO);
          contexto.despuesDeCambiarEstadoServicio(data.extraInfo);
        } else {
          this.toastr.warning(data.operacionMensaje, LS.TAG_AVISO);
          contexto.cargando = false;
        }
      }
    ).catch(err => this.utilService.handleError(err, contexto));
  }

  eliminarServicio(parametro, contexto) {
    this.api.delete2('servicios/'+parametro).then(
      (data) => {
        if (data && data.extraInfo) {
          this.toastr.success(data.operacionMensaje, LS.TAG_EXITO);
          contexto.despuesDeEliminarServicio(data.extraInfo);
        } else {
          this.toastr.warning(data.operacionMensaje, LS.TAG_AVISO);
          contexto.cargando = false;
        }
      }
    ).catch(err => this.utilService.handleError(err, contexto));
  }

  mostrarServicio(parametro, contexto) {
    this.api.get2('servicios/' + parametro).then(
      (data) => {
        if (data && data.extraInfo) {
          contexto.despuesDeMostrarServicio(data.extraInfo);
        } else {
          this.toastr.warning(data.operacionMensaje, LS.TAG_AVISO);
          contexto.cargando = false;
        }
      }
    ).catch(err => this.utilService.handleError(err, contexto));
  }

  busquedaServicios(parametro, contexto) {
    this.api.post2('buscarservicio', parametro).then(
      (res) => {
        if (res) {
          contexto.despuesDeBusquedaServicios(res);
        } else {
          this.toastr.warning('No se encontraron resultados', LS.TAG_AVISO);
          contexto.cargando = false;
        }
      }
    ).catch(err => this.utilService.handleError(err, contexto));
  }
}
