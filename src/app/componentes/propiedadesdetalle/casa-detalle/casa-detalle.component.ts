import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Casa } from 'src/app/entidades/casa/entidad.casa';
import { CasaMensaje } from 'src/app/entidades/casa/entidad.casamensaje';
import { FileItem } from 'src/app/entidades/file/file-item';
import { Servicios } from 'src/app/entidades/empresa/entidad.servicios';
import { Casaservicio } from 'src/app/entidades/casa/entidad.casaservicio';
import { Foto } from 'src/app/entidades/file/entidad.foto';
import { Persona } from 'src/app/entidades/empresa/entidad.persona';
import { UbigeoGuardar } from 'src/app/entidades/ubigeo/entidad.ubigeoguardar';
import { HabilitacionUrbana } from 'src/app/entidades/empresa/entidad.habilitacionurbana';
import { LS } from 'src/app/constantes/app.constants';
import { ApiRequestService } from 'src/app/servicios/configuracion/api-request/api-request.service';
import { ToastrService } from 'ngx-toastr';
import { MailService } from 'src/app/servicios/configuracion/mail/mail.service';
import { Ubigeo } from 'src/app/entidades/ubigeo/entidad.ubigeo';
import { ZoomControlOptions, ControlPosition, ZoomControlStyle, FullscreenControlOptions,
  ScaleControlOptions, ScaleControlStyle, PanControlOptions } from '@agm/core/services/google-maps-types';

@Component({
  selector: 'app-casa-detalle',
  templateUrl: './casa-detalle.component.html',
  styleUrls: ['./casa-detalle.component.css']
})
export class CasaDetalleComponent implements OnInit {

  @Input() id;
  @Output() enviarAccion = new EventEmitter();
  public casa: Casa;
  public mensaje: CasaMensaje;
  public cargando: boolean = false;
  public archivos: FileItem[] = [];
  public servicios: Servicios[];
  public casaservicios: Casaservicio[];
  public fotos: Foto[];
  public persona: Persona;
  public ubigeo: UbigeoGuardar;
  public habilitacionurbana: HabilitacionUrbana;
  public listaLP: any = []; // lista de persona-roles
  errors: Array<Object> = [];
  public constantes: any = LS;
  // Mapa
  public latitude: number = -5.196395;
  public longitude: number = -80.630287;
  public zoom: number = 16;

  constructor(
    private api: ApiRequestService,
    private toastr: ToastrService,
    private mensajeService: MailService
  ) {
    this.casa = new Casa();
    this.mensaje = new CasaMensaje();
    this.fotos = [];
    this.servicios = [];
    this.persona = new Persona();
    this.ubigeo = new UbigeoGuardar();
    this.habilitacionurbana = new HabilitacionUrbana();
    this.ubigeo.departamento = new Ubigeo();
    this.ubigeo.provincia = new Ubigeo();
    this.ubigeo.distrito = new Ubigeo();
    this.ubigeo.ubigeo = new Ubigeo();
    this.archivos = [];
    this.listaLP = [];
  }

  ngOnInit() {
    if (this.id) {
      this.obtenerCasa(this.id);
    }
  }

  verPropiedades(propiedad) {
    let parametros = {
      propiedad: propiedad,
    }
    this.enviarAccion.emit(parametros);
  }

  obtenerCasa(id) {
    // aqui traemos los datos del usuario con ese id para ponerlo en el formulario y editarlo
    this.cargando = true;
    this.api.get2('casas/' + id).then(
      (data) => {
        // console.log(data.);
        if (data && data.extraInfo) {
          this.casa = data.extraInfo;
          this.listaLP = data.extraInfo.casapersonaList;
          this.persona = this.listaLP[0];
          this.ubigeo = data.extraInfo.ubigeo;
          this.habilitacionurbana = data.extraInfo.habilitacionurbana;
          this.servicios = data.extraInfo.serviciosList;
          this.casaservicios = data.extraInfo.casaservicioList;

          for (const item of data.extraInfo.fotosList) {
            console.log('foto: ');
            console.log(item);
            this.fotos.push(item);
          }
          console.log('fotoss : ');
          console.log(this.fotos);
          // this.fotos = res.fotosList;
          console.log('traido para edicion');
          console.log(this.casa);
          this.casa.fotosList = []; // tiene que ser vacio xq son la lista de imagenes nuevas pa agregarse
          // traer archivos de firebase storage
          // this._cargaImagenes.getImagenes(res.path);

          // aqui metodo para mostrar todas las imagenes de este propiedad ....
          // this.imagen = res.foto;
          // this.imagenAnterior = res.foto;
          // Mapa
          this.casa.latitud = this.casa.latitud ? this.casa.latitud : this.latitude+""
          this.casa.longitud = this.casa.longitud ? this.casa.longitud : this.longitude+""
          this.latitude = Number.parseFloat(this.casa.latitud);
          this.longitude = Number.parseFloat(this.casa.longitud);
          // End Mapa
          this.cargando = false;
        }
      },
      (error) => {
        if (error.status === 422) {
          this.errors = [];
          const errors = error.json();
          console.log('Error');
          // this.cargando = false;
          /*for (const key in errors) {
            this.errors.push(errors[key]);
          }*/
        }
      }
    ).catch(err => this.handleError(err));
  }

  enviarmensaje() {
    this.cargando = true;
    this.mensaje.casa_id = this.casa.id;
    this.api.post2('casamensaje', this.mensaje).then(
      (res) => {
        console.log('se ha enviado mensaje: ');
        console.log(res);
        this.toastr.success('Mensaje enviado');
        this.enviarCorreo();
        // this.mensaje = new CasaMensaje();
        // this.cargando = false;
      },
      (error) => {
        if (error.status === 422) {
          this.errors = [];
          const errors = error.json();
          console.log('Error');
          this.cargando = false;
          this.handleError(error);
          /*for (const key in errors) {
            this.errors.push(errors[key]);
          }*/
        }
      }
    ).catch(err => this.handleError(err));
  }

  enviarCorreo() {
    let parametros = {
      propiedad: 'Casa',
      propiedad_id: this.casa.codigo,
      contrato: this.casa.contrato==='A' ? 'Alquiler' : 'Venta', 
      cliente: this.mensaje.nombres,
      telefono: this.mensaje.telefono,
      email: this.mensaje.email,
      titulo: this.mensaje.titulo,
      mensaje: this.mensaje.mensaje,
      emailReceptor: LS.KEY_EMPRESA_SELECT ? LS.KEY_EMPRESA_SELECT.correo : 'javierromualdo2014@gmail.com'
    }
    // this.cargando = true;
    this.mensajeService.envioCorreoDelCliente(parametros, this);
  }

  despuesDeEnvioCorreoDelCliente(data) {
    if (data) {
      this.mensaje = new CasaMensaje();
    }
    this.cargando = false;
  }

  private handleError(error: any): void {
    // this.cargando = false;
    this.toastr.error('Error Interno: ' + error, 'Error');
  }

  // Mapa
  zoomControlOptions: ZoomControlOptions = {
    position: ControlPosition.RIGHT_BOTTOM,
    style: ZoomControlStyle.LARGE
  };

  fullscreenControlOptions: FullscreenControlOptions = {
    position : ControlPosition.TOP_RIGHT
  };

  // mapTypeControlOptions: MapTypeControlOptions = {
  //   mapTypeIds: [ MapTypeId.ROADMAP],
  //   position: ControlPosition.BOTTOM_LEFT,
  // };

  scaleControlOptions: ScaleControlOptions = {
    style: ScaleControlStyle.DEFAULT
  }

  panControlOptions: PanControlOptions = {
    position: ControlPosition.LEFT_TOP,
  }
  // End Mapa
}
