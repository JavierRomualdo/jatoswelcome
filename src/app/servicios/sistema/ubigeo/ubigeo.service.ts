import { Injectable } from '@angular/core';
import { ApiRequestService } from '../../configuracion/api-request/api-request.service';
import { UtilService } from '../../configuracion/util/util.service';
import { ToastrService } from 'ngx-toastr';
import { LS } from 'src/app/constantes/app.constants';

@Injectable({
  providedIn: 'root'
})
export class UbigeoService {

  constructor(
    private api: ApiRequestService,
    private utilService: UtilService,
    private toastr: ToastrService
  ) { }

  litarUbigeos(contexto) {
    this.api.get2('ubigeos').then(
      (res) => {
        if (res.length>0) {
          contexto.despuesDeListarUbigeos(res);
        } else {
          this.toastr.warning('No se encontraron resultados', LS.TAG_AVISO);
          contexto.cargando = false;
        }
      }
    ).catch(err => this.utilService.handleError(err, contexto));
  }

  ingresarUbigeo(parametro, contexto) {
    this.api.post2('ubigeos', parametro).then(
      (res) => {
        if (res) {
          this.toastr.success('Se ha ingresado correctamente', LS.TAG_EXITO);
          contexto.despuesDeIngresarUbigeo(res);
        } else {
          this.toastr.warning('Error al ingresar ubigeo', LS.TAG_AVISO);
          contexto.cargando = false;
        }
      }
    ).catch(err => this.utilService.handleError(err, contexto));
  }

  modificarUbigeo(parametro, contexto) {
    this.api.put2('ubigeos/' + parametro.ubigeo.id, parametro).then(
      (res) => {
        if (res) {
          this.toastr.success('Se ha modificado correctamente', LS.TAG_EXITO);
          contexto.despuesDeModificarUbigeo(res);
        } else {
          this.toastr.warning('Error al modificar casa', LS.TAG_AVISO);
          contexto.cargando = false;
        }
      }
    ).catch(err => this.utilService.handleError(err, contexto));
  }

  cambiarEstadoUbigeo(parametro, contexto) {
    this.api.delete2('ubigeos/' + parametro).then(
      (res) => {
        if (res) {
          this.toastr.success('Se ha modificado el estado', LS.TAG_EXITO);
          contexto.despuesDeCambiarEstadoUbigeo(res);
        } else {
          this.toastr.warning('Error al modificar estado', LS.TAG_AVISO);
          contexto.cargando = false;
        }
      }
    ).catch(err => this.utilService.handleError(err, contexto));
  }

  mostrarUbigeo(parametro, contexto) {
    this.api.get2('ubigeos/' + parametro).then(
      (res) => {
        if (res) {
          contexto.despuesDeMostrarUbigeo(res);
        } else {
          this.toastr.warning('Error al mostrar ubigeo', LS.TAG_AVISO);
          contexto.cargando = false;
        }
      }
    ).catch(err => this.utilService.handleError(err, contexto));
  }

  mostrarUbigeos(parametro, contexto) {
    this.api.get2('mostrarubigeos/' + parametro.idtipoubigeo + '/' + parametro.codigo).then(
      (res) => {
        if (res) {
          if (parametro.idtipoubigeo === 1) { // departamento
            // listo las provincias del departamento
            contexto.despuesDeMostrarUbigeosProvincias(res);
          } else if (parametro.idtipoubigeo === 2) { // provincia
            // listo los distritos de la provincia
            contexto.despuesDeMostrarUbigeosDistritos(res);
          } else if (parametro.idtipoubigeo === 3) { // distrito
            contexto.despuesDeMostrarUbigeosHabilitacionUrbanas(res);
          }
        } else {
          this.toastr.warning('No se encontraron resultados', 'Aviso');
          contexto.cargando = false;
        }
      }
    ).catch(err => this.utilService.handleError(err, contexto));
  }

  listarubigeos(parametro, contexto) {
    this.api.post2('listarubigeos', parametro).then(
      (data) => {
        if (data) {
          if (parametro.tipoubigeo_id === 0) {
            contexto.despuesDeMostrarUbigeosDepartamentos(data.extraInfo);
          } else if (parametro.tipoubigeo_id === 1) { // departamento
            // listo las provincias del departamento
            contexto.despuesDeMostrarUbigeosProvincias(data.extraInfo);
          } else if (parametro.tipoubigeo_id === 2) { // provincia
            // listo los distritos de la provincia
            contexto.despuesDeMostrarUbigeosDistritos(data.extraInfo);
          } else if (parametro.tipoubigeo_id === 3) { // distrito
            contexto.despuesDeMostrarUbigeosHabilitacionUrbanas(data.extraInfo);
          }
          !data.extraInfo && this.toastr.warning(data.operacionMensaje, LS.TAG_AVISO);
        }
      }
    ).catch(err => this.utilService.handleError(err, contexto));
  }

  busquedaUbigeos(parametro, contexto) {
    this.api.post2('buscarubigeos', parametro).then(
      (res) => {
        if (res) {
          contexto.despuesDeBusquedaUbigeos(res);
        } else {
          this.toastr.warning('No se encontraron resultados', LS.TAG_AVISO);
          contexto.cargando = false;
        }
      }
    ).catch(err => this.utilService.handleError(err, contexto));
  }

  searchUbigeo(parametro, contexto) {
    this.api.get2('searchUbigeo/'+parametro).then(
      (res) => {
        contexto.despuesDeSearchUbigeo(res);
      }
    ).catch(err => this.utilService.handleError(err, contexto));
  }

  buscarUbigeosDistrito(parametro, contexto) {
    this.api.get2('buscarUbigeosDistrito/'+parametro).then(
      (res) => {
        contexto.despuesDeBuscarUbigeosDistrito(res);
      }
    ).catch(err => this.utilService.handleError(err, contexto));
  }

  buscarDistritosYHabilitaciones(parametro, contexto) {
    this.api.get2('buscarDistritosYHabilitaciones/'+parametro).then(
      (res) => {
        contexto.despuesDeBuscarDistritosYHabilitaciones(res);
      }
    ).catch(err => this.utilService.handleError(err, contexto));
  }

  mostrarUbigeoProvincia(parametro, contexto) {
    this.api.post2('mostrarUbigeoProvincia', parametro).then(
      (data) => {
        if (data && data.extraInfo) {
          contexto.despuesDeMostrarUbigeoProvincia(data.extraInfo);
        } else {
          this.toastr.warning(data.operacionMensaje, LS.TAG_AVISO);
          contexto.cargando = false;
        }
      }
    ).catch(err => this.utilService.handleError(err, contexto));
  }

  mostrarUbigeoAnterior(parametro, contexto) {
    this.api.post2('mostrarUbigeoAnterior', parametro).then(
      (data) => {
        if (data && data.extraInfo) {
          contexto.despuesDeMostrarUbigeoAnterior(data.extraInfo);
        } else {
          this.toastr.warning(data.operacionMensaje, LS.TAG_AVISO);
          contexto.cargando = false;
        }
      }
    ).catch(err => this.utilService.handleError(err, contexto));
  }
}
