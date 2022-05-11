import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { Usuario } from './usuario';
import swal from 'sweetalert2';
@Injectable({
  providedIn: 'root',
})
export class UsuarioService {



  public usuario: Usuario;
  
  private addAuthorizationHeader(){
    let token = this.authService.token;
    if(token != null){
      return this.httpHeaders.append('Authorization', 'Bearer' + token);
    }
    return this.httpHeaders;
  }

  private isNoAuthorized(e): boolean {
    if(e.status==401){
      this.router.navigate(['/login'])
      return true;
    }
    if(e.status==403){
      this.router.navigate(['/productos'])
      swal.fire('Acceso denegado', `Hola ${this.authService.usuario.username} no tienes acceso a este recurso.`, 'warning')
      return true;
    }
    return false;
  }

  
  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  private urlEndPoint: string = 'http://localhost:8080/api/user';

  private httpHeaders = new HttpHeaders({ 'Content-type': 'application/json' });

  create(usuario: Usuario): Observable<Usuario> {
    console.log(usuario.nombre);
    
    return this.http.post(this.urlEndPoint, usuario, { headers:this.httpHeaders })
      .pipe(
        map((response: any) => response.usuario as Usuario),
        catchError((e) => {
          if (e.status == 400) {
            return throwError(() => e);
          }
          console.error(e.error.mensaje);
          swal.fire(
            'Error al crear',
            e.error.mensaje + ' ' + this.usuario.nombre,
            'error'
          );
          return throwError(() => e);
        })
      );
  }

  updateUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(
      `${this.urlEndPoint}${usuario.id}`,
      usuario, {headers:this.addAuthorizationHeader()}
    ).pipe(
      catchError((e) => {
        if(this.isNoAuthorized(e)){
          return throwError(() => e); 
        }
        console.error(e.error.mensaje);
        swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(() => e);
      })
    );;
  }
}
