import { RegisterComponent } from './usuarios/register.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ClienteComponent } from './clientes/cliente/cliente.component';
import { ClientesComponent } from './clientes/clientes.component';
import { FormComponent } from './clientes/form.component';
import { FormProductoComponent } from './productos/form.component';
import { ProductosComponent } from './productos/productos.component';
import { LoginComponent } from './usuarios/login.component';
import { FormDatosPersonalesComponent } from './clientes/cliente/form-datos-personales/form-datos-personales.component';
import { MisPedidosComponent } from './clientes/cliente/mis-pedidos/mis-pedidos.component';
import { FormSeguridadComponent } from './clientes/cliente/form-seguridad/form-seguridad.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'clientes', component: ClientesComponent },
  { path: 'clientes/page/:page', component: ClientesComponent },
  //rutas de producto
  { path: 'productos', component: ProductosComponent },
  { path: 'productos/page/:page', component: ProductosComponent },
  //rutas de cliente
  { path: 'clientes/form', component: FormComponent },
  { path: 'cliente/mi-cuenta',
    component: ClienteComponent,
    children: [
      { path: 'datos-personales/:id', component: FormDatosPersonalesComponent },
      { path: 'mis-pedidos', component: MisPedidosComponent },
      { path: 'sec-form', component: FormSeguridadComponent },
    ]},
  { path: 'clientes/form/:id', component: FormComponent },
  { path: 'productos/form', component: FormProductoComponent },
  { path: 'productos/form/:id', component: FormProductoComponent },
  { path: 'login', component: LoginComponent },
  { path: 'user/register', component: RegisterComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
