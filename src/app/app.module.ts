import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ClientesComponent } from './clientes/clientes.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ProductosComponent } from './productos/productos.component';
import { FormComponent } from './clientes/form.component';
import { FormProductoComponent } from './productos/form.component';
import { PaginatorComponent } from './paginator/paginator.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import localeES from '@angular/common/locales/es';
import { DetalleComponent } from './productos/detalle/detalle.component';
import { LoginComponent } from './usuarios/login.component';

import { RegisterComponent } from './usuarios/register.component';
import { CarritoComponent } from './carrito/carrito.component';
import { ClienteComponent } from './clientes/cliente/cliente.component';
import { SideMenuComponent } from './clientes/side-menu/side-menu.component';
import { FormDatosPersonalesComponent } from './clientes/cliente/form-datos-personales/form-datos-personales.component';
import { FormSeguridadComponent } from './clientes/cliente/form-seguridad/form-seguridad.component';
import { MisPedidosComponent } from './clientes/cliente/mis-pedidos/mis-pedidos.component';
import { AppRoutingModule } from './app-routing.module';
import { MustMatchDirective } from './usuarios/must-match-directive';

registerLocaleData(localeES, 'es');


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    ClientesComponent,
    ProductosComponent,
    FormProductoComponent,
    FormComponent,
    PaginatorComponent,
    DetalleComponent,
    LoginComponent,
    ClienteComponent,
    RegisterComponent,
    CarritoComponent,
    SideMenuComponent,
    FormDatosPersonalesComponent,
    FormSeguridadComponent,
    MisPedidosComponent,
    MustMatchDirective
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'es' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
