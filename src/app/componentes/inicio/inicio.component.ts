import { Component, OnInit } from '@angular/core';
import { LS } from 'src/app/constantes/app.constants';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { UbigeoService } from 'src/app/servicios/sistema/ubigeo/ubigeo.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  public constantes: any = LS;
  public tipopropiedades: string[] = [];
  public tipocontratodetalle = [];
  public ubigeo: any; //
  public propiedad: string = null; //
  public contratodetalle: any = null; // {}
  public filteridUbigeos;

  constructor(
    private router: Router,
    public toastr: ToastrService,
    private titleService: Title,
    private ubigeoService: UbigeoService
  ) { }

  ngOnInit() {
    this.titleService.setTitle( LS.PAGINA_JATOS );
    this.tipopropiedades = LS.LISTA_PROPIEDADES;
    this.tipocontratodetalle = LS.LISTA_CONTRATO_DETALLE;
  }

  verPropiedades(propiedad: string) {
    LS.KEY_PROPIEDAD_SELECT = propiedad;
    this.router.navigate(['propiedades']);
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
    this.router.navigate(['servicios']); 
  }

  // busqueda de propiedades
  filterUbigeoSingle(event) {
    let query = event.query;
    this.ubigeoService.searchUbigeo(query.toLowerCase(), this);
  }

  despuesDeSearchUbigeo(data) {
    this.filteridUbigeos = data;
  }

  buscarPropiedades() {
    if (typeof this.ubigeo === 'object' && this.contratodetalle && this.propiedad) {
      LS.KEY_UBIGEO = this.ubigeo.rutaubigeo.split(", ");
      LS.KEY_PROPIEDAD_SELECT = this.propiedad;
      LS.KEY_CONTRATO_SELECT = this.contratodetalle.codigo;
      // limpiar atributos
      this.ubigeo = null;
      this.propiedad = null;
      this.contratodetalle = null;
      this.router.navigate(['propiedades']);
    } else {
      this.toastr.warning('Ingrese todos los datos', 'Aviso');
    }
  }
}
