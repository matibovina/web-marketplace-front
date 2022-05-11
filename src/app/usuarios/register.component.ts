import { Component, OnInit } from '@angular/core';
import { Usuario } from './usuario';
import { UsuarioService } from './usuario.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public usuario: Usuario = new Usuario();

  public titulo: string = 'Editar datos personales';

  public errors: string[];

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  ngOnInit(): void {}
  
  onSubmit() {
    this.create();
  return;
  }


  create(): void {
    console.log(this.usuario.nombre);

    this.usuarioService.create(this.usuario).subscribe(
      (usuario) => {
        this.router.navigate(['/productos']);
        swal.fire(
          'Nuevo Cliente',
          `Usuario ${this.usuario.nombre} creado con exito`,
          'success'
        );
      },
      (err) => {
        this.errors = err.error.errors as string[];
        console.error(err.error.errors);
        console.error(err.status);
      }
    );
  }
}
