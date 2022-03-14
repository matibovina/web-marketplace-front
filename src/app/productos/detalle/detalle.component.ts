import { ActivatedRoute } from '@angular/router';
import { Producto } from './../producto';
import { Component, Input, OnInit } from '@angular/core';
import { ProductoService } from '../producto.service';
import { ModalService } from './modal.service';
import swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'detalle-producto',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css'],
})
export class DetalleComponent implements OnInit {
  @Input() producto: Producto;

  titulo: string = 'Subir imagen Producto';
  public fotoSeleccionada: File;
  public fotosSeleccionadas: File[];
  progreso: number = 0;

  constructor(
    private productoService: ProductoService,
    private activatedRoute: ActivatedRoute,
    public modalService: ModalService
  ) {}

  ngOnInit(): void {
    /*this.activatedRoute.paramMap.subscribe((params) => {
      let id: number = +params.get('id');
      if (id) {
        this.productoService.getProducto(id).subscribe((producto) => {
          this.producto = producto;
        });
      }
    }); */
  }

  seleccionarFoto(event: any) {
    this.fotoSeleccionada = event.target.files[0];
    this.progreso = 0;
    if (this.fotoSeleccionada.type.indexOf('image') < 0) {
      swal.fire('Error Upload: ', 'El formato permitido es jpg, png', 'error');
    }
  }

  subirFoto() {
    if (!this.fotoSeleccionada) {
      swal.fire('Error Upload: ', 'Debe seleccionar una imagen', 'error');
    } else {
      this.productoService
        .uploadImagen(this.fotoSeleccionada, this.producto.id)
        .subscribe((event) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progreso = Math.round(event.loaded / event.total) * 100;
          } else if (event.type === HttpEventType.Response) {
            let response: any = event.body;
            this.producto = response.producto as Producto;

            this.modalService.notificarUpload.emit(this.producto);

            swal.fire('La foto se ha subido!', response.mensaje, 'success');
          }
          // this.producto = producto;
        });
    }
  }
  subirFotos() {
    if (!this.fotoSeleccionada) {
      swal.fire('Error Upload: ', 'Debe seleccionar una imagen', 'error');
    } else {
      this.productoService
        .uploadImagen(this.fotoSeleccionada, this.producto.id)
        .subscribe((event) => {
          // this.producto = producto;
          swal.fire(
            'La foto se ha subido!',
            `La foto se ha subido con éxito ${this.producto.imagen}`,
            'success'
          );
        });
    }
  }

  seleccionarFotos(event: any) {
    this.fotosSeleccionadas =
      event.target.files[this.fotosSeleccionadas.length];
    for (let i = 0; i < this.fotosSeleccionadas.length; i++) {
      if (this.fotosSeleccionadas[i].type.indexOf('image') < 0) {
        swal.fire(
          'Error Upload: ',
          'El formato permitido es jpg, png',
          'error'
        );
      }
    }
  }

  cerrarModal(){
    this.modalService.cerrarModal();
    this.fotoSeleccionada = null;
    this.progreso = 0;
  }
}
