import { Injectable } from '@angular/core';
import { ApiRequestService } from '../api-request/api-request.service';
import { ToastrService } from 'ngx-toastr';
import { UtilService } from '../util/util.service';
import { LS } from 'src/app/constantes/app.constants';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(
    private api: ApiRequestService,
    private utilService: UtilService,
    private toastr: ToastrService
  ) { }

  envioCorreoDelCliente(parametro, contexto) {
    this.api.post2('enviarMensajeCliente', parametro).then(
      (data) => {
        if (data && data.extraInfo) {
          this.toastr.success(data.operacionMensaje, LS.TAG_EXITO);
          contexto.despuesDeEnvioCorreoDelCliente(data.extraInfo);
        } else {
          this.toastr.warning(data.operacionMensaje, LS.TAG_AVISO);
          contexto.cargando = false;
        }
      }
    ).catch(err => this.utilService.handleError(err, contexto));
  }

  enviarMensajeContacto(parametro, contexto) {
    this.api.post2('enviarMensajeContacto', parametro).then(
      (data) => {
        if (data && data.extraInfo) {
          this.toastr.success(data.operacionMensaje, LS.TAG_EXITO);
          contexto.despuesDeEnviarMensajeContacto(data.extraInfo);
        } else {
          this.toastr.warning(data.operacionMensaje, LS.TAG_AVISO);
          contexto.cargando = false;
        }
      }
    ).catch(err => this.utilService.handleError(err, contexto));
  }

  reenviarCorreoPaCliente(parametro, contexto) {
    this.api.post2('reenviarMensajeCliente', parametro).then(
      (data) => {
        if (data && data.extraInfo) {
          this.toastr.success(data.operacionMensaje, LS.TAG_EXITO);
          contexto.despuesDeReenviarCorreoPaCliente(data.extraInfo);
        } else {
          this.toastr.warning(data.operacionMensaje, LS.TAG_AVISO);
          contexto.cargando = false;
        }
      }
    ).catch(err => this.utilService.handleError(err, contexto));
  }
}
