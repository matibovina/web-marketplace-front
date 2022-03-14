import { ActivatedRoute } from '@angular/router';
import { ProductoService } from './producto.service';
import { ModalService } from './detalle/modal.service';
import { Component, OnInit } from '@angular/core';
import { Producto } from './producto';
import Swal from 'sweetalert2';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
})
export class ProductosComponent implements OnInit {
  productos: Producto[];

  paginador: any;
  productoSeleccionado: Producto;

  constructor(
    private productoService: ProductoService,
    private modalService: ModalService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    /*this.productoService
      .getProductos()
      .subscribe((productos) => (this.productos = productos));
 */
    this.activatedRoute.paramMap.subscribe((params) => {
      let page: number = +params.get('page');
      if (!page) {
        page = 0;
      }
      this.productoService
        .getProductos(page)
        .pipe(
          tap((response) => {
            (response.content as Producto[]).forEach((producto) => {
              console.log(producto.nombre);
            });
          })
        )
        .subscribe((response) => {
          (this.productos = response.content as Producto[]),
            (this.paginador = response);
        });
    });

    this.modalService.notificarUpload.subscribe(
      producto => {
        this.productos = this.productos.map(
           productoOriginal => {
            if(producto.id == productoOriginal.id){
              productoOriginal.imagen = producto.imagen;
            }
            return productoOriginal;
          }
        )
      }
    );
  }

  deleteProducto(producto: Producto): void {
    if (confirm('Seguro que quieres borrar el producto?')) {
      let alertConfirm = () =>
        this.productoService
          .deleteProducto(producto.id)
          .subscribe((response) => {
            this.productos = this.productos.filter((prod) => prod !== producto);
            alert(`${producto.nombre} borrado con exito!`);
          });
    }
  }

  abrirModal(producto: Producto){
    this.productoSeleccionado = producto;
    this.modalService.abrirModal();
  }

}
/*  Swal.fire({
        title: `Estas seguro de borrar a ${producto.nombre}?`,
        text: "No podras revertir esta accion!", 
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, borrarlo!'
      }).then((result) => {
        if (result.isConfirmed) {
  
          this.productoService.deleteProducto(producto.id).subscribe(
            response => {
              this.productos = this.productos.filter(prod => prod !== producto)
              Swal.fire(
                'Borrado!',
                `${producto.nombre} ha sido borrado.`,
                'success'
              )
            }
          )
  
         
        }
      }) */
