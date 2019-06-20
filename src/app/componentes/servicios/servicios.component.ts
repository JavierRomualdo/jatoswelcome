import { Component, OnInit } from '@angular/core';
import { LS } from 'src/app/constantes/app.constants';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent implements OnInit {

  public tiposervicio = LS.KEY_SERVICIO_DOCUMENT ? LS.KEY_SERVICIO_DOCUMENT.titulo:LS.TAG_JARDINERIA;
  public listaServicios: any;
  constructor() { }

  ngOnInit() {
    const {[LS.KEY_SERVICIO_DOCUMENT ? LS.KEY_SERVICIO_DOCUMENT.titulo: 
      LS.TAG_JARDINERIA]: servicios} = LS.LISTA_SERVICIOS;
    this.listaServicios = servicios;
  }

}
