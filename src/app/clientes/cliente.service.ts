import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { AuthService } from '../usuarios/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private urlEndPoint: string = 'http://localhost:8080/api/clientes';

  private httpHeaders = new HttpHeaders({ 'Content-type': 'application/json' });

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {}

  private addAuthorizationHeader(){
    let token = this.authService.token;
    if(token != null){
      return this.httpHeaders.append('Authorization', 'Bearer' + token);
    }
    return this.httpHeaders;
  }

  private isNoAuthorized(e): boolean {
    if(e.status==401 || e.status == 403){
      this.router.navigate(['/login'])
      return true;
    }
    return false;
  }

  getClientes(): Observable<Cliente[]>{
    //return of(CLIENTES);

    return this.http.get(this.urlEndPoint, {headers:this.addAuthorizationHeader()}).pipe(
      tap(response => {
        let clientes = response as Cliente[];
        clientes.forEach( cliente => {
          console.log(cliente.nombre);
          
        }
        )
      }),
      map( response => response as Cliente[]),
      tap(response => {
        response.forEach( cliente => {
          console.log(cliente.apellido);
          
        }
        )
      }),
      catchError(e => {
        // if(this.isNoAuthorized(e)){
        //   return throwError(() => e); 
        // }
        this.router.navigate(['/clientes']);
        console.error(e.error.mensaje);
        
        swal.fire('Error al editar', e.error.mensaje, 'error');
          return throwError(() => e);
      })
    );
  }

  create(cliente: Cliente): Observable<Cliente> {
    return this.http
      .post(this.urlEndPoint, cliente, {headers:this.addAuthorizationHeader()})
      .pipe(
        map((response: any) => response.cliente as Cliente),
        catchError((e) => {
          if(this.isNoAuthorized(e)){
            return throwError(() => e); 
          }
          if (e.status == 400) {
            return throwError(() => e);
          }
          console.error(e.error.mensaje);
          swal.fire('Error al crear', e.error.mensaje, 'error');
          return throwError(() => e);
        })
      );
  }

  getCliente(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`, {headers:this.addAuthorizationHeader()}).pipe(
      catchError((e) => {
        if(this.isNoAuthorized(e)){
          return throwError(() => e); 
        }
        this.router.navigate(['/clientes']);
        console.error(e.error.mensaje);

        swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(() => e);
      })
    );
  }

  updateCliente(cliente: Cliente): Observable<any> {
    return this.http
      .put<any>(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers:this.addAuthorizationHeader()})
      .pipe(
        catchError((e) => {
          if(this.isNoAuthorized(e)){
            return throwError(() => e); 
          }
          console.error(e.error.mensaje);
          swal.fire('Error al editar', e.error.mensaje, 'error');
          return throwError(() => e);
        })
      );
  }

  deleteCliente(id: number): Observable<Cliente> {
    return this.http
      .delete<Cliente>(`${this.urlEndPoint}/${id}`, {headers:this.addAuthorizationHeader()})
      .pipe(
        catchError((e) => {
          if(this.isNoAuthorized(e)){
            return throwError(() => e); 
          }
          this.router.navigate(['/clientes']);
          console.error(e.error.mensaje);

          swal.fire('Error al eliminar', e.error.mensaje, 'error');
          return throwError(() => e);
        })
      );
  }
}



  // getClientes(page: number): Observable<any> {
  //   //return of(CLIENTES);

  //   return this.http.get(`${this.urlEndPoint}/page/${page}`).pipe(
  //     tap((response: any) => {
  //       (response.content as Cliente[]).forEach((cliente) => {
  //         console.log(cliente.nombre);
  //       });
  //     }),
  //     map((response: any) => {
  //       (response.content as Cliente[]).map((cliente) => {
  //         cliente.nombre = cliente.nombre.toUpperCase();
  //         return cliente;
  //       });
  //       return response;
  //     }),
  //     tap((response: any) => {
  //       (response.content as Cliente[]).forEach((cliente) => {
  //         console.log(cliente.apellido);
  //       });
  //     }),
  //     catchError((e) => {
  //       this.router.navigate(['/clientes']);
  //       console.error(e.error.mensaje);

  //       swal.fire('Error al editar', e.error.mensaje, 'error');
  //       return throwError(() => e);
  //     })
  //   );
  // }
