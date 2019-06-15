import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from '../componentes/inicio/inicio.component';
import { NosotrosComponent } from '../componentes/nosotros/nosotros.component';
import { PropiedadesComponent } from '../componentes/propiedades/propiedades.component';
import { ServiciosComponent } from '../componentes/servicios/servicios.component';
import { ContactoComponent } from '../componentes/contacto/contacto.component';

const appRoutes: Routes = [
  {path: '', component: InicioComponent},
  {path: 'inicio', component: InicioComponent},
  {path: 'nosotros', component: NosotrosComponent},
  {path: 'propiedades', component: PropiedadesComponent},
  {path: 'contacto', component: ContactoComponent},
  {path: 'servicios', component: ServiciosComponent},
  {path: '', redirectTo: 'inicio', pathMatch: 'full'}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(
      appRoutes
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
