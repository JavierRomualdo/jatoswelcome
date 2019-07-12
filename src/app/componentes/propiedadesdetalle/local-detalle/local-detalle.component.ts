import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Local } from 'src/app/entidades/local/entidad.local';
import { LocalMensaje } from 'src/app/entidades/local/entidad.localmensaje';
import { Servicios } from 'src/app/entidades/empresa/entidad.servicios';
import { Localservicio } from 'src/app/entidades/local/entidad.localservicio';
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
  selector: 'app-local-detalle',
  templateUrl: './local-detalle.component.html',
  styleUrls: ['./local-detalle.component.css']
})
export class LocalDetalleComponent implements OnInit {

  @Input() id;
  @Output() enviarAccion = new EventEmitter();
  public local: Local;
  public mensaje: LocalMensaje;
  public cargando: Boolean = false;
  public servicios: Servicios[];
  public localservicios: Localservicio[];
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
    this.local = new Local();
    this.mensaje = new LocalMensaje();
    this.fotos = [];
    this.servicios = [];
    this.persona = new Persona();
    this.ubigeo = new UbigeoGuardar();
    this.habilitacionurbana = new HabilitacionUrbana();
    this.ubigeo.departamento = new Ubigeo();
    this.ubigeo.provincia = new Ubigeo();
    this.ubigeo.ubigeo = new Ubigeo();
    this.listaLP = [];
  }

  ngOnInit() {
    if (this.id) {
      this.obtenerLocal(this.id);
    }
  }

  verPropiedades(propiedad) {
    let parametros = {
      propiedad: propiedad,
    }
    this.enviarAccion.emit(parametros);
  }

  obtenerLocal(id) {
    // aqui traemos los datos del usuario con ese id para ponerlo en el formulario y editarlo
    this.cargando = true;
    this.propiedadesService.mostrarPropiedadLocal(id, this);
  }

  despuesDeMostrarPropiedadLocal(data) {
    this.local = data;
    this.listaLP = data.localpersonaList;
    this.persona = this.listaLP[0];
    this.ubigeo = data.ubigeo;
    this.habilitacionurbana = data.habilitacionurbana;
    this.servicios = data.serviciosList;
    this.localservicios = data.localservicioList;

    for (const item of data.fotosList) {
      console.log('foto: ');
      console.log(item);
      this.fotos.push(item);
    }
    console.log('fotoss : ');
    console.log(this.fotos);
    console.log('traido para edicion');
    console.log(this.local);
    this.local.fotosList = []; // tiene que ser vacio xq son la lista de imagenes nuevas pa agregarse
    
    // Mapa
    this.local.latitud = this.local.latitud ? this.local.latitud : this.latitude+""
    this.local.longitud = this.local.longitud ? this.local.longitud : this.longitude+""
    this.latitude = Number.parseFloat(this.local.latitud);
    this.longitude = Number.parseFloat(this.local.longitud);
    // End Mapa
    this.cargando = false;
  }

  enviarmensaje() {
    this.cargando = true;
    this.mensaje.local_id = this.local.id;
    this.propiedadesService.ingresarMensajeLocal(this.mensaje, this);
  }

  despuesIngresarMensajeLocal(data) {
    console.log('se ha enviado mensaje: ');
    console.log(data);
    this.enviarCorreo();
  }

  enviarCorreo() {
    let parametros = {
      propiedad: 'Local',
      propiedad_id: this.local.codigo,
      contrato: this.local.contrato==='A' ? 'Alquiler' : 'Venta', 
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
    this.mensaje = new LocalMensaje();
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
