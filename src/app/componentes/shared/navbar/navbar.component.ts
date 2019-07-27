import { Component, ViewChild, OnInit } from '@angular/core';
import { LS } from 'src/app/constantes/app.constants';
import { Router } from '@angular/router';
// import { ServiciosComponent } from '../../servicios/servicios.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit  {
  // @ViewChild(ServiciosComponent , {static: false}) servicioComponent: ServiciosComponent;
  public constantes: any = LS;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  verServicio(servicio: string) {
    switch (servicio) {
      case LS.TAG_JARDINERIA:
        LS.KEY_SERVICIO_DOCUMENT = {
          titulo: servicio,
          documento: "assets/documentos/estados-de-las-promesas.pdf"
        };
        break;
      case LS.TAG_DISENIO_INTERIORES:
        LS.KEY_SERVICIO_DOCUMENT = {
          titulo: servicio,
          documento: "assets/documentos/INDUSTRIAS ALIMENTARIAS_2.pdf"
        };
        break;
      case LS.TAG_DISENIO_EXTERIORES:
        LS.KEY_SERVICIO_DOCUMENT = {
          titulo: servicio,
          documento: "assets/documentos/LIBRO 100 Experimentos sencillos Fisica y Quimica.pdf"
        };     
        break;
      case LS.TAG_CAMARA_VIGILANCIA:
        LS.KEY_SERVICIO_DOCUMENT = {
          titulo: servicio,
          documento: "assets/documentos/NIIF.pdf"
        };        
        break;
      default:
        break;
    }
    // if (this.router.isActive('servicios', true)) {
    //   console.log("url servicios esta activada");
    //   this.servicioComponent.actualizarVistaServicio(LS.KEY_SERVICIO_DOCUMENT);
    // } else {
    //   console.log("url servicios no esta activada");
    // }
    this.router.navigate(['servicios']); 

  }
}
