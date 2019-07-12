import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Habitacion } from 'src/app/entidades/habitacion/entidad.habitacion';
import { HabitacionMensaje } from 'src/app/entidades/habitacion/entidad.habitacionmensaje';
import { Servicios } from 'src/app/entidades/empresa/entidad.servicios';
import { Habitacionservicio } from 'src/app/entidades/habitacion/entidad.habitacionservicio';
import { Foto } from 'src/app/entidades/file/entidad.foto';
import { Persona } from 'src/app/entidades/empresa/entidad.persona';
import { UbigeoGuardar } from 'src/app/entidades/ubigeo/entidad.ubigeoguardar';
import { HabilitacionUrbana } from 'src/app/entidades/empresa/entidad.habilitacionurbana';
import { MailService } from 'src/app/servicios/configuracion/mail/mail.service';
import { Ubigeo } from 'src/app/entidades/ubigeo/entidad.ubigeo';
import { ZoomControlOptions, ControlPosition, ZoomControlStyle, FullscreenControlOptions,
  ScaleControlOptions, ScaleControlStyle, PanControlOptions } from '@agm/core/services/google-maps-types';
import { LS } from 'src/app/constantes/app.constants';
import { PropiedadesService } from 'src/app/servicios/sistema/propiedades/propiedades.service';

@Component({
  selector: 'app-habitacion-detalle',
  templateUrl: './habitacion-detalle.component.html',
  styleUrls: ['./habitacion-detalle.component.css']
})
export class HabitacionDetalleComponent implements OnInit {

  @Input() id;
  @Output() enviarAccion = new EventEmitter();
  public habitacion: Habitacion;
  public mensaje: HabitacionMensaje;
  public cargando: Boolean = false;
  public servicios: Servicios[];
  public habitacionservicios: Habitacionservicio[];
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
    this.habitacion = new Habitacion();
    this.mensaje = new HabitacionMensaje();
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
      this.obtenerHabitacion(this.id);
    }
  }

  verPropiedades(propiedad) {
    let parametros = {
      propiedad: propiedad,
    }
    this.enviarAccion.emit(parametros);
  }

  obtenerHabitacion(id) {
    // aqui traemos los datos del usuario con ese id para ponerlo en el formulario y editarlo
    this.cargando = true;
    this.propiedadesService.mostrarPropiedadHabitacion(id, this);
  }

  despuesDeMostrarPropiedadHabitacion(data) {
    this.habitacion = data;
    this.listaLP = data.habitacionpersonaList;
    this.persona = this.listaLP[0];
    this.ubigeo = data.ubigeo;
    this.habilitacionurbana = data.habilitacionurbana;
    this.servicios = data.serviciosList;
    this.habitacionservicios = data.habitacionservicioList;

    for (const item of data.fotosList) {
      console.log('foto: ');
      console.log(item);
      this.fotos.push(item);
    }
    console.log('fotoss : ');
    console.log(this.fotos);
    console.log('traido para edicion');
    console.log(this.habitacion);
    this.habitacion.fotosList = []; // tiene que ser vacio xq son la lista de imagenes nuevas pa agregarse
    
    // Mapa
    this.habitacion.latitud = this.habitacion.latitud ? this.habitacion.latitud : this.latitude+""
    this.habitacion.longitud = this.habitacion.longitud ? this.habitacion.longitud : this.longitude+""
    this.latitude = Number.parseFloat(this.habitacion.latitud);
    this.longitude = Number.parseFloat(this.habitacion.longitud);
    // End Mapa
    this.cargando = false;
  }

  enviarmensaje() {
    this.cargando = true;
    this.mensaje.habitacion_id = this.habitacion.id;
    this.propiedadesService.ingresarMensajeHabitacion(this.mensaje, this);
  }

  despuesIngresarMensajeHabitacion(data) {
    console.log('se ha enviado mensaje: ');
    console.log(data);
    this.enviarCorreo();
  }

  enviarCorreo() {
    let parametros = {
      propiedad: 'Habitación',
      propiedad_id: this.habitacion.codigo,
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
    this.mensaje = new HabitacionMensaje();
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
