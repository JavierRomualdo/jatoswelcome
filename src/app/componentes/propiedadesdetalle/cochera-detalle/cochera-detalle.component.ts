import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Cochera } from 'src/app/entidades/cochera/entidad.cochera';
import { CocheraMensaje } from 'src/app/entidades/cochera/entidad.cocheramensaje';
import { Servicios } from 'src/app/entidades/empresa/entidad.servicios';
import { Cocheraservicio } from 'src/app/entidades/cochera/entidad.cocheraservicio';
import { Foto } from 'src/app/entidades/file/entidad.foto';
import { Persona } from 'src/app/entidades/empresa/entidad.persona';
import { UbigeoGuardar } from 'src/app/entidades/ubigeo/entidad.ubigeoguardar';
import { HabilitacionUrbana } from 'src/app/entidades/empresa/entidad.habilitacionurbana';
import { LS } from 'src/app/constantes/app.constants';
import { MailService } from 'src/app/servicios/configuracion/mail/mail.service';
import { Ubigeo } from 'src/app/entidades/ubigeo/entidad.ubigeo';
import { ZoomControlOptions, ControlPosition, ZoomControlStyle, FullscreenControlOptions,
  ScaleControlOptions, ScaleControlStyle, PanControlOptions } from '@agm/core/services/google-maps-types';
import { PropiedadesService } from 'src/app/servicios/sistema/propiedades/propiedades.service';

@Component({
  selector: 'app-cochera-detalle',
  templateUrl: './cochera-detalle.component.html',
  styleUrls: ['./cochera-detalle.component.css']
})
export class CocheraDetalleComponent implements OnInit {

  @Input() id;
  @Output() enviarAccion = new EventEmitter();
  public cochera: Cochera;
  public mensaje: CocheraMensaje;
  public cargando: Boolean = false;
  public servicios: Servicios[];
  public casaservicios: Cocheraservicio[];
  public fotos: Foto[];
  public persona: Persona;
  public ubigeo: UbigeoGuardar;
  public habilitacionurbana: HabilitacionUrbana;
  public listaLP: any = []; // lista de persona-roles
  public constantes: any = LS;
  // Mapa
  public latitude: number = -5.196395;
  public longitude: number = -80.630287;
  public zoom: number = 16;

  constructor(
    private propiedadesService: PropiedadesService,
    private mensajeService: MailService
  ) {
    this.cochera = new Cochera();
    this.mensaje = new CocheraMensaje();
    this.fotos = [];
    this.servicios = [];
    this.persona = new Persona();
    this.ubigeo = new UbigeoGuardar();
    this.habilitacionurbana = new HabilitacionUrbana();
    this.ubigeo.departamento = new Ubigeo();
    this.ubigeo.provincia = new Ubigeo();
    this.ubigeo.distrito = new Ubigeo();
    this.ubigeo.ubigeo = new Ubigeo();
    this.listaLP = [];
  }

  ngOnInit() {
    if (this.id) {
      this.obtenerCochera(this.id);
    }
  }

  verPropiedades(propiedad) {
    let parametros = {
      propiedad: propiedad,
    }
    this.enviarAccion.emit(parametros);
  }

  obtenerCochera(id) {
    // aqui traemos los datos del usuario con ese id para ponerlo en el formulario y editarlo
    this.cargando = true;
    this.propiedadesService.mostrarPropiedadCochera(id, this);
  }

  despuesDeMostrarPropiedadCochera(data) {
    this.cochera = data;
    this.listaLP = data.casapersonaList;
    this.ubigeo = data.ubigeo;
    this.habilitacionurbana = data.habilitacionurbana;
    this.servicios = data.serviciosList;
    this.casaservicios = data.casaservicioList;

    for (const item of data.fotosList) {
      console.log("foto: ");
      console.log(item);
      this.fotos.push(item);
    }
    console.log("fotoss : ");
    console.log(this.fotos);
    console.log("traido para edicion");
    console.log(this.cochera);
    this.cochera.fotosList = []; // tiene que ser vacio xq son la lista de imagenes nuevas pa agregarse
    
    // Mapa
    this.cochera.latitud = this.cochera.latitud ? this.cochera.latitud : this.latitude+""
    this.cochera.longitud = this.cochera.longitud ? this.cochera.longitud : this.longitude+""
    this.latitude = Number.parseFloat(this.cochera.latitud);
    this.longitude = Number.parseFloat(this.cochera.longitud);
    // End Mapa
    this.cargando = false;
  }

  enviarmensaje() {
    this.cargando = true;
    this.mensaje.cochera_id = this.cochera.id;
    this.propiedadesService.ingresarMensajeCochera(this.mensaje, this);
  }

  despuesIngresarMensajeCochera(data) {
    console.log("se ha enviado mensaje: ");
    console.log(data);
    this.enviarCorreo();
  }

  enviarCorreo() {
    let parametros = {
      propiedad: 'Cochera',
      propiedad_id: this.cochera.codigo,
      contrato: 'Alquiler', 
      cliente: this.mensaje.nombres,
      telefono: this.mensaje.telefono,
      email: this.mensaje.email,
      titulo: this.mensaje.titulo,
      mensaje: this.mensaje.mensaje,
      emailReceptor: LS.KEY_EMPRESA_SELECT ? LS.KEY_EMPRESA_SELECT.correo : 'javierromualdo2014@gmail.com'
    }
    this.mensajeService.envioCorreoDelCliente(parametros, this);
  }

  despuesDeEnvioCorreoDelCliente(data) {
    this.mensaje = new CocheraMensaje();
    this.cargando = false;
  }

  // Mapa
  zoomControlOptions: ZoomControlOptions = {
    position: ControlPosition.RIGHT_BOTTOM,
    style: ZoomControlStyle.LARGE
  };

  fullscreenControlOptions: FullscreenControlOptions = {
    position : ControlPosition.TOP_RIGHT
  };

  scaleControlOptions: ScaleControlOptions = {
    style: ScaleControlStyle.DEFAULT
  }

  panControlOptions: PanControlOptions = {
    position: ControlPosition.LEFT_TOP,
  }
  // End Mapa
}
