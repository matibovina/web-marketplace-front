import { catchError } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Usuario } from './usuario';
import swal from 'sweetalert2'
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  titulo:string ='Inicie Sesión';
  usuario:Usuario;
  constructor(private authService: AuthService, private router: Router) {
    this.usuario = new Usuario();
   }



  ngOnInit(): void {
    if(this.authService.isAuthenticated()){
      swal.fire('Login', `Hola ${this.authService.usuario.username}`, 'info');
      this.router.navigate(['/clientes']);
    }
  }

  login(): void {
    console.log(this.usuario);
    if (this.usuario.username == null || this.usuario.password == null){
      swal.fire('Error Login', 'Username o password vacias!', 'error');
      return;
    }

    this.authService.login(this.usuario).subscribe(response => {
      
      this.authService.guardarUsuario(response.access_token);
      this.authService.guardarToken(response.access_token);
      let usuario = this.authService.usuario;

      console.log(response);
      this.router.navigate(['/clientes']);
      swal.fire('Login', `Hola ${usuario.username}, has iniciado sesion con exito!`, 'success');
      
    }, err => {
      if(err.status == 400){
      swal.fire(' Error Login', `Usuario o clave incorrectas!`, 'error');
      }
    }
    );
    
  }

}
