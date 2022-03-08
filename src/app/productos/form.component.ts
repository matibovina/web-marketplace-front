import { ProductoService } from './producto.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Producto } from './producto';
import swal from 'sweetalert2';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormProductoComponent implements OnInit {

  public producto: Producto = new Producto();
  public titulo: string = 'Crear Producto';


  constructor(private productoService: ProductoService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarProducto()

  }

  cargarProducto(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if(id){
        this.productoService.getProducto(id).subscribe(
          (producto) => this.producto = producto
        )
      }
    })
  }

  public createProducto(): void {
    this.productoService.createProducto(this.producto).subscribe(
      response => this.router.navigate(['/productos'])
    )
  }

  updateProducto(): void {
    this.productoService.updateCliente(this.producto)
    .subscribe( producto => {
      this.router.navigate(['/productos'])
      swal.fire('Producto ACtualizado', `Producto ${this.producto.nombre} actualizado con exito!`, 'success')
    })
  }

}
