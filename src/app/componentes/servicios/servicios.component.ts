import { Component, OnInit } from '@angular/core';
import { LS } from 'src/app/constantes/app.constants';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent implements OnInit {

  public tiposervicio = LS.KEY_SERVICIO_DOCUMENT ? LS.KEY_SERVICIO_DOCUMENT.titulo:LS.TAG_JARDINERIA;
  public listaServicios: any;
  public claseBackgroud: string;
  constructor(
    private titleService: Title
  ) { }

  ngOnInit() {
    this.titleService.setTitle( LS.PAGINA_SERVICIOS );
    const {[LS.KEY_SERVICIO_DOCUMENT ? LS.KEY_SERVICIO_DOCUMENT.titulo: 
      LS.TAG_JARDINERIA]: servicios} = LS.LISTA_SERVICIOS;
    this.listaServicios = servicios;
    switch (this.tiposervicio) {
      case LS.TAG_JARDINERIA:
        this.claseBackgroud = 'backgroudJardineria';
        break;
      case LS.TAG_DISENIO_INTERIORES:
        this.claseBackgroud = 'backgroudDisInteriores';
        break;
      case LS.TAG_DISENIO_EXTERIORES:
        this.claseBackgroud = 'backgroudDisExteriores';
        break;
      case LS.TAG_CAMARA_VIGILANCIA:
        this.claseBackgroud = 'backgroudVigilancia';
        break;
      default:
        break;
    }
  }

  actualizarVistaServicio(KEY_SERVICIO_DOCUMENT) {
    const {[KEY_SERVICIO_DOCUMENT ? KEY_SERVICIO_DOCUMENT.titulo: 
      LS.TAG_JARDINERIA]: servicios} = LS.LISTA_SERVICIOS;
    this.listaServicios = servicios;
    switch (this.tiposervicio) {
      case LS.TAG_JARDINERIA:
        this.claseBackgroud = 'backgroudJardineria';
        break;
      case LS.TAG_DISENIO_INTERIORES:
        this.claseBackgroud = 'backgroudDisInteriores';
        break;
      case LS.TAG_DISENIO_EXTERIORES:
        this.claseBackgroud = 'backgroudDisExteriores';
        break;
      case LS.TAG_CAMARA_VIGILANCIA:
        this.claseBackgroud = 'backgroudVigilancia';
        break;
      default:
        break;
    }
  }
}
