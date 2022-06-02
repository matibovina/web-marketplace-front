import  swal  from 'sweetalert2';
import { PRODUCTOS } from './productos.json';
import { Producto } from './producto';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../usuarios/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private urlEndPoint: string = 'http://localhost:8080/api/productos';
  private httpHeaders = new HttpHeaders({ 'Content-type': 'application/json' });

  constructor(private http: HttpClient, private router: Router, public authService: AuthService) {}

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

  getProductos(page: number): Observable<any> {

    return this.http.get(`${this.urlEndPoint}/page/${page}`).pipe(
      tap((response: any) => {
        (response.content as Producto[]).forEach((producto) => {
          console.log(producto.nombre);
        });
      }),
      map((response: any) => {
        (response.content as Producto[]).map((producto) => {
          producto.nombre = producto.nombre.toUpperCase();
          return producto;
        });
        return response;
      }),
      tap((response: any) => {
        (response.content as Producto[]).forEach((producto) => {
        });
      }),
      catchError((e) => {
        this.router.navigate(['/productos']);
        console.error(e.error.mensaje);

        swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(() => e);
      })
    );
  }

/*  getProductos(): Observable<Producto[]> {
    //return of(PRODUCTOS);
    return this.http
      .get(this.urlEndPoint)
      .pipe(map((response) => response as Producto[]));
  } */

  createProducto(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.urlEndPoint, producto, {headers:this.addAuthorizationHeader()});
  }

  getProducto(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.urlEndPoint}${id}`).pipe(
      catchError((e) => {
        if(this.isNoAuthorized(e)){
          return throwError(() => e); 
        }
        this.router.navigate(['/productos']);
        console.error(e.error.mensaje);
        swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(() => e);
      })
    );
  }

  updateProducto(producto: Producto): Observable<Producto> {
    return this.http.put<Producto>(
      `${this.urlEndPoint}${producto.id}`,
      producto, {headers:this.addAuthorizationHeader()}
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

  deleteProducto(id: any): Observable<Producto> {
    return this.http.delete<Producto>(`${this.urlEndPoint}/${id}`, {headers: this.addAuthorizationHeader()}).pipe(
      catchError((e) => {
        if(this.isNoAuthorized(e)){
          return throwError(() => e); 
        }
        //this.router.navigate(['/productos']);
        console.error(e.error.mensaje);
        //swal.fire('Error al eliminar', e.error.mensaje, 'error');
        return throwError(() => e);
      })
    );;
  }

  uploadImagen(archivo: File, id: any): Observable<HttpEvent<{}>>{
    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("id", id);

    let httpHeaders = new HttpHeaders();
    let token = this.authService.token;
    if(token != null){
      httpHeaders = httpHeaders.append('Authorization', 'Bearer' + token);
    }

    const req = new HttpRequest('POST', `${this.urlEndPoint}/upload`, formData, {
      reportProgress: true,
      headers: httpHeaders
    });

    return this.http.request(req);

  }
}
/*
  create(car : Mycar, archivos: Array<File>) : Observable<HttpEvent<{}>>{
 
  let formData = new FormData();
  formData.append("car", JSON.stringify(car));
 
  for (var i = 0; i < archivos.length; i++) {
      formData.append("archivos", archivos[i]);
   }
    const req = new HttpRequest('POST', `${this.urlEndPoint}`, formData, {
      reportProgress: true
    });
    return this.http.request(req);

*/