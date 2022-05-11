import { ClienteService } from './cliente.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  public cliente: Cliente = new Cliente();
  public titulo: string = 'Cliente Nuevo';

  public errores: string[];

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
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

  public create(): void {
    this.clienteService.create(this.cliente).subscribe(
      (cliente) => {
        this.router.navigate(['/clientes']);
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
        this.router.navigate(['/clientes']);
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
