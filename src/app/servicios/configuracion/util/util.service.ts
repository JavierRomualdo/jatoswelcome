import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { LS } from 'src/app/constantes/app.constants';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(
    public toastr: ToastrService,
    private router: Router
  ) { }

  obtenerHorayFechaActual() { //DE LA PC DE USUARIO
    return moment().format('hh_mm_ss DD-MM-YYYY');
  }

  seleccionarPropiedad(propiedades: Array<string>): string {
    let propiedadSeleccionada = null;
    if (propiedades && propiedades.length > 0) {
      propiedadSeleccionada = propiedades.find(item => item === LS.KEY_PROPIEDAD_SELECT);
    }
    return propiedadSeleccionada;
  }

  handleError(error: any, contexto?) {
    switch (error.status) {
      case 401:
      case 403:
        this.toastr.warning('No autorizado', 'Aviso');
        sessionStorage.clear();
        localStorage.clear();
        this.router.navigate(['login']);
        break;
      case 404:
        this.toastr.warning('página solicitada no se encuentra', 'Aviso');
        break;
      case 0:
        this.toastr.warning("No hay conexión con el servidor.", 'Aviso');
        break;
      default:
        this.toastr.error(error.message || error, 'Error');
        break;
    }
    contexto && (contexto.cargando = false);
  }
}
