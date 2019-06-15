import { Component, OnInit } from '@angular/core';
import { Empresa } from 'src/app/entidades/empresa/entidad.empresa';
import { EmpresaService } from 'src/app/servicios/sistema/empresa/empresa.service';
import { LS } from 'src/app/constantes/app.constants';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  public empresa: Empresa;
  public fecha = new Date();

  constructor(
    private empresaService: EmpresaService,
  ) { }

  ngOnInit() {
    this.empresa = new Empresa();
    if (LS.KEY_EMPRESA_SELECT) {
      this.empresa = LS.KEY_EMPRESA_SELECT;
    } else {
      this.traerParaEdicion();
    }
  }

  traerParaEdicion() {
    this.empresaService.listarEmpresa(this);
  }

  despuesDeListarEmpresa(data) {
    this.empresa = data;
    LS.KEY_EMPRESA_SELECT = this.empresa;
  }
}
