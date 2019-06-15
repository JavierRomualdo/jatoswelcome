import { Component, OnInit } from '@angular/core';
import { Empresa } from 'src/app/entidades/empresa/entidad.empresa';
import { UbigeoGuardar } from 'src/app/entidades/ubigeo/entidad.ubigeoguardar';
import { LS } from 'src/app/constantes/app.constants';
import { ApiRequestService } from 'src/app/servicios/configuracion/api-request/api-request.service';
import { EmpresaService } from 'src/app/servicios/sistema/empresa/empresa.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Ubigeo } from 'src/app/entidades/ubigeo/entidad.ubigeo';
import { ZoomControlOptions, ControlPosition, ZoomControlStyle, FullscreenControlOptions,
  ScaleControlOptions, ScaleControlStyle, PanControlOptions } from '@agm/core/services/google-maps-types';
  
@Component({
  selector: 'app-nosotros',
  templateUrl: './nosotros.component.html',
  styleUrls: ['./nosotros.component.css']
})
export class NosotrosComponent implements OnInit {

  public empresa: Empresa;
  public imagen: string = null;
  public imagenAnterior: string = null; // solo se usara para editar usuario
  public ubigeo: UbigeoGuardar;
  public constantes: any = LS;
  public fecha = new Date();
  // Mapa
  public latitude: number = -5.196395;
  public longitude: number = -80.630287;
  public zoom: number = 16;
  
  constructor(
    public api: ApiRequestService,
    private empresaService: EmpresaService,
    private router: Router,
    private titleService: Title
  ) {
    this.empresa = new Empresa();
    this.empresa.ubigeo_id = new Ubigeo();

    this.ubigeo = new UbigeoGuardar();
    this.ubigeo.departamento = new Ubigeo();
    this.ubigeo.provincia = new Ubigeo();
    this.ubigeo.ubigeo = new Ubigeo();
  }

  ngOnInit() {
    this.titleService.setTitle( LS.PAGINA_NOSOTROS );
    this.traerParaEdicion();
  }

  verPropiedades(contrato: string) {
    LS.KEY_CONTRATO_SELECT = contrato;
    this.router.navigate(['/welcome/propiedades'])
  }

  traerParaEdicion() {
    if (LS.KEY_EMPRESA_SELECT) {
      this.empresa = LS.KEY_EMPRESA_SELECT;
      this.cargarMapa();
    } else {
      this.empresaService.listarEmpresa(this);
    }
  }

  despuesDeListarEmpresa(data) {
    this.empresa = data;
    this.ubigeo = data.ubigeo;
    this.imagen = data.foto;
    this.imagenAnterior = data.foto;
    LS.KEY_EMPRESA_SELECT = this.empresa;
    console.log("empresa", data);
    this.cargarMapa();
  }

  cargarMapa() {
    // Mapa
    this.empresa.latitud = this.empresa.latitud ? this.empresa.latitud : this.latitude+""
    this.empresa.longitud = this.empresa.longitud ? this.empresa.longitud : this.longitude+""
    this.latitude = Number.parseFloat(this.empresa.latitud);
    this.longitude = Number.parseFloat(this.empresa.longitud);
    // End Mapa
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
