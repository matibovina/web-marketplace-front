import { ClienteService } from './cliente.service';
import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import swal from 'sweetalert2';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];

  constructor(private clientesService: ClienteService) {}

  ngOnInit(): void {
    this.clientesService.getClientes().subscribe(
      clientes =>  this.clientes = clientes
      
    );
  }

  delete(cliente: Cliente): void{

  /*  confirmAction();

    function confirmAction(){
      let confirmAction = confirm("Estas seguro que quieres borrarlo?")
      if(confirmAction) {
        alert(`El cliente ${this.cliente} se borro exitosamente.`)
      } else {
        alert('No se borro.')
      }
    } */


    Swal.fire({
      title: `Estas seguro de borrar a ${cliente.nombre} ${cliente.apellido}?`,
      text: "No podras revertir esta accion!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrarlo!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.clientesService.deleteCliente(cliente.id).subscribe(
          response => {
            this.clientes = this.clientes.filter(cli => cli !== cliente)
            Swal.fire(
              'Borrado!',
              `El cliente ${cliente.nombre} ha sido borrado.`,
              'success'
            )
          }
        )

       
      }
    })
  }


}
