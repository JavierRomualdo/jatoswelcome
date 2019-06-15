import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiRequestService } from '../../configuracion/api-request/api-request.service';
import { UtilService } from '../../configuracion/util/util.service';
import { LS } from 'src/app/constantes/app.constants';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor(
    private api: ApiRequestService,
    private utilService: UtilService,
    private toastr: ToastrService,
  ) { }

  listarEmpresa(contexto) {
    this.api.get2('empresa').then(
      (data) => {
        if (data && data.extraInfo) {
          contexto.despuesDeListarEmpresa(data.extraInfo);
        } else {
          this.toastr.warning(data.operacionMensaje, LS.TAG_AVISO);
          contexto.imagenAnterior = undefined;
          contexto.cargando = false;
        }
      }
    ).catch(err => this.utilService.handleError(err, contexto));
  }

  ingresarEmpresa(parametro, contexto) {
    this.api.post2('empresa', parametro).then(
      (data) => {
        if (data && data.extraInfo) {
          this.toastr.success(data.operacionMensaje, LS.TAG_EXITO);
          contexto.despuesDeIngresarEmpresa(data.extraInfo);
        } else {
          this.toastr.warning(data.operacionMensaje, LS.TAG_AVISO);
          contexto.cargando = false;
        }
      }
    ).catch(err => this.utilService.handleError(err, contexto));
  }

  modificarEmpresa(parametro, contexto) {
    this.api.put2('empresa/' + parametro.id, parametro).then(
      (data) => {
        if (data && data.extraInfo) {
          this.toastr.success(data.operacionMensaje, LS.TAG_EXITO);
          contexto.despuesDeModificarEmpresar(data.extraInfo);
        } else {
          this.toastr.warning(data.operacionMensaje, LS.TAG_AVISO);
          contexto.cargando = false;
        }
      }
    ).catch(err => this.utilService.handleError(err, contexto));
  }
}
