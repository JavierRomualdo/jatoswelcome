import { UbigeoTipo } from './entidad.tipoubigeo';
import { HabilitacionUrbana } from '../empresa/entidad.habilitacionurbana';

export class Ubigeo {
  id: number;
  tipoubigeo_id: UbigeoTipo = new UbigeoTipo();
  habilitacionurbana_id: HabilitacionUrbana = new HabilitacionUrbana();
  ubigeo: string = "";
  rutaubigeo: string = "";
  codigo: string = null;
  siglas: string = "";
  estado: boolean = true;

  constructor(data?) {
    data ? this.hydrate(data) : null;
  }

  hydrate(data) {
    this.tipoubigeo_id = data.tipoubigeo_id ? data.tipoubigeo_id : this.tipoubigeo_id;
    this.habilitacionurbana_id = data.habilitacionurbana_id ? data.habilitacionurbana_id: this.habilitacionurbana_id;
    this.ubigeo = data.ubigeo ? data.ubigeo : this.ubigeo;
    this.rutaubigeo = data.rutaubigeo ? data.rutaubigeo : this.rutaubigeo;
    this.codigo = data.codigo ? data.codigo : this.codigo;
    this.siglas = data.siglas ? data.siglas : this.siglas;
    this.estado = data.estado ? data.estado : this.estado;
  }
}
