import { Usuario } from './../usuarios/usuario';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';
import { ClienteService } from './cliente.service';
import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import swal from 'sweetalert2';
import Swal from 'sweetalert2';
import { AuthService } from '../usuarios/auth.service';
@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[];
  paginador: any;

  usuario: Usuario;

  constructor(
    private clientesService: ClienteService,
    private activatedRoute: ActivatedRoute,
    public authService: AuthService
  ) {}

  ngOnInit(): void {

    this.clientesService
      .getClientes()
      .subscribe((clientes) => (this.clientes = clientes));

 /*   this.activatedRoute.paramMap.subscribe((params) => {
      let page: number = +params.get('page');
      if(!page){
        page = 0
      }
      this.clientesService
        .getClientes(page)
        .pipe(
          tap((response) => {
            (response.content as Cliente[]).forEach((cliente) => {
              console.log(cliente.nombre);
            });
          })
        )
        .subscribe(
          (response) => {(this.clientes = response.content as Cliente[]),
            this.paginador = response;
        });
    }); */
  }

  delete(cliente: Cliente): void {
    console.log(
    this.authService.usuario.id, ' ',
    cliente.id
    );
    if(this.authService.hasRole('ROLE_ADMIN') || this.authService.usuario.id == cliente.id){

    Swal.fire({
      title: `Estas seguro de borrar a ${cliente.nombre} ${cliente.apellido}?`,
      text: 'No podras revertir esta accion!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrarlo!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.clientesService.deleteCliente(cliente.id).subscribe(() => {
          this.clientes = this.clientes.filter((cli) => cli !== cliente);
          Swal.fire(
            'Borrado!',
            `El cliente ${cliente.nombre} ha sido borrado.`,
            'success'
          );
        });
      }
    });
  } else {
    swal.fire('ACCESO DENEGADO', 'No estas autorizado', 'warning')
    
  }
  }
}
