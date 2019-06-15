import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppComponent } from './app.component';
import { FooterComponent } from './componentes/shared/footer/footer.component';
import { NavbarComponent } from './componentes/shared/navbar/navbar.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { NosotrosComponent } from './componentes/nosotros/nosotros.component';
import { PropiedadesComponent } from './componentes/propiedades/propiedades.component';
import { ServiciosComponent } from './componentes/servicios/servicios.component';
import { ContactoComponent } from './componentes/contacto/contacto.component';
import { AppRoutingModule } from './rutas/app-routing.module';
import { ModalComponent } from './componentes/shared/modal/modal.component';
import { CasaDetalleComponent } from './componentes/propiedadesdetalle/casa-detalle/casa-detalle.component';
import { CocheraDetalleComponent } from './componentes/propiedadesdetalle/cochera-detalle/cochera-detalle.component';
import { HabitacionDetalleComponent } from './componentes/propiedadesdetalle/habitacion-detalle/habitacion-detalle.component';
import { LocalDetalleComponent } from './componentes/propiedadesdetalle/local-detalle/local-detalle.component';
import { LoteDetalleComponent } from './componentes/propiedadesdetalle/lote-detalle/lote-detalle.component';
import { CargandoComponent } from './componentes/shared/cargando/cargando.component';

import { Autonumeric2Directive } from './directivas/autonumeric2/autonumeric2.directive';
import { AutonumericDirective } from './directivas/autonumeric/autonumeric.directive';
import { FocusDirective } from './directivas/focus/focus.directive';
import { AppConfig } from './app-config';
import { ApiRequestService } from './servicios/configuracion/api-request/api-request.service';
import { AgmCoreModule } from '@agm/core';
import { ToastrModule } from 'ngx-toastr';
import { KeyFilterModule } from 'primeng/keyfilter';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { PaginatorModule } from 'primeng/paginator';
import { TooltipModule } from 'primeng/tooltip';
import { TabViewModule } from 'primeng/tabview';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    InicioComponent,
    NosotrosComponent,
    PropiedadesComponent,
    ServiciosComponent,
    ContactoComponent,
    ModalComponent,
    CasaDetalleComponent,
    CocheraDetalleComponent,
    HabitacionDetalleComponent,
    LocalDetalleComponent,
    LoteDetalleComponent,
    Autonumeric2Directive,
    AutonumericDirective,
    FocusDirective,
    CargandoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyACiya9u1WJZ3DBZmZcw2gUlczgoHtxC80',
      libraries: ["places"]
    }),
    ToastrModule.forRoot({
      closeButton: true
    }),
    KeyFilterModule,
    AutoCompleteModule,
    DropdownModule,
    CheckboxModule,
    ScrollPanelModule,
    PaginatorModule,
    TooltipModule,
    TabViewModule
  ],
  providers: [
    AppConfig,
    ApiRequestService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
