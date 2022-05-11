import { UsuarioService } from './../../../usuarios/usuario.service';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/usuarios/usuario';
import swal from 'sweetalert2'

@Component({
  selector: 'app-form-seguridad',
  templateUrl: './form-seguridad.component.html',
  styleUrls: ['./form-seguridad.component.css']
})
export class FormSeguridadComponent implements OnInit {

  usuario: Usuario;

  errores: string[];

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
  }


  onSubmit() {

   }

   update(): void {
    this.usuarioService.updateUsuario(this.usuario).subscribe(
      (json) => {
        
        swal.fire(
          'Cliente ACtualizado',
          `Password actualizada con exito!`,
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
