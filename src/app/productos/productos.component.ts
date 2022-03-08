import { ProductoService } from './producto.service';
import { Component, OnInit } from '@angular/core';
import { Producto } from './producto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  productos: Producto[];

  constructor(private productoService: ProductoService) { }

  ngOnInit(): void {
    this.productoService.getProductos().subscribe(
      productos =>  this.productos = productos
    );
  }

  deleteProducto(producto: Producto): void{

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
      })
    }
  

  checkAllCheckBox(ev: any) {
		this.productos.forEach(x => x.isDisponible = ev.target.checked)

  }
  isAllCheckBoxChecked() {
		return this.productos.every(p => p.isDisponible);
	}
}
