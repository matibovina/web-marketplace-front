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

import { FormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import localeES from '@angular/common/locales/es';
import { DetalleComponent } from './productos/detalle/detalle.component';
import { LoginComponent } from './usuarios/login.component';
registerLocaleData(localeES, 'es');

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'clientes', component: ClientesComponent },
  { path: 'clientes/page/:page', component: ClientesComponent },
  { path: 'productos', component: ProductosComponent },
  { path: 'productos/page/:page', component: ProductosComponent },
  { path: 'clientes/form', component: FormComponent },
  { path: 'clientes/form/:id', component: FormComponent },
  { path: 'productos/form', component: FormProductoComponent },
  { path: 'productos/form/:id', component: FormProductoComponent },
  { path: 'login', component: LoginComponent },
  //{ path: 'productos/ver/:id', component: DetalleComponent },
];

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
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'es' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
