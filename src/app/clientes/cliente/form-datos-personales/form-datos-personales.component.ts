import { UsuarioService } from './../../../usuarios/usuario.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ClienteService } from './../../cliente.service';
import { Cliente } from './../../cliente';
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { Usuario } from 'src/app/usuarios/usuario';
@Component({
  selector: 'app-form-datos-personales',
  host: {
    class:'item-menu-cliente'
  },
  templateUrl: './form-datos-personales.component.html',
  styleUrls: ['./form-datos-personales.component.css']
})
export class FormDatosPersonalesComponent implements OnInit {
 public cliente: Cliente = new Cliente();
 public usuario: Usuario;
 public titulo: string = 'Editar datos personales';

 public errores: string[];

 constructor(private clienteService: ClienteService,
  private usuarioService: UsuarioService,
    private router: Router,
    private activatedRoute:ActivatedRoute) { }

    

  ngOnInit(): void { 
    setTimeout(() => (console.log(this.cliente.nombre)), 1000)
    this.cargarCliente();
  }

  cargarCliente(): void {
    this.activatedRoute.params.subscribe((params) => {
      let id = params['id'];
      if (id) {
        this.clienteService
          .getCliente(id)
          .subscribe((cliente) => (this.cliente = cliente));
      }
      
    });
  }


  create(): void {
  this.clienteService.create(this.cliente).subscribe(
    (cliente) => {
      //this.router.navigate(['/clientes']);
      swal.fire(
        'Nuevo Cliente',
        `Cliente ${this.cliente.nombre} creado con exito`,
        'success'
      );
    },
    (err) => {
      this.errores = err.error.errors as string[];
      console.error(err.error.errors);
      console.error(err.status);
    }
  );
}

update(): void {
  this.clienteService.updateCliente(this.cliente).subscribe(
    (json) => {
      swal.fire(
        'Cliente ACtualizado',
        `Cliente ${json.cliente.nombre} actualizado con exito!`,
        'success'
      );
    },
    (err) => {
      this.errores = err.error.errors as string[];
      console.error(err.error.errors);
      console.error(err.status);
    }
  );
}
}