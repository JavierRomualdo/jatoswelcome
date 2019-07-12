import { Component, OnInit } from '@angular/core';
import { CasaMensaje } from 'src/app/entidades/casa/entidad.casamensaje';
import { MailService } from 'src/app/servicios/configuracion/mail/mail.service';
import { Title } from '@angular/platform-browser';
import { LS } from 'src/app/constantes/app.constants';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {

  public mensaje: CasaMensaje;
  public cargando: boolean = false;

  constructor(
    private mensajeService: MailService,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.titleService.setTitle( LS.PAGINA_CONTACTO );
    this.mensaje = new CasaMensaje();
  }

  enviarmensaje() {
    this.cargando = true;
    let parametros = {
      nombres: this.mensaje.nombres,
      telefono: this.mensaje.telefono,
      email: this.mensaje.email,
      titulo: this.mensaje.titulo,
      mensaje: this.mensaje.mensaje,
      emailReceptor: LS.KEY_EMPRESA_SELECT ? LS.KEY_EMPRESA_SELECT.correo : 'javierromualdo2014@gmail.com'
    }
    this.mensajeService.enviarMensajeContacto(parametros, this);
  }

  despuesDeEnviarMensajeContacto(data) {
    this.mensaje = new CasaMensaje();
    this.cargando = false;
  }
}
