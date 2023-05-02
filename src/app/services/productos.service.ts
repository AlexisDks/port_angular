import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/producto.interface';
import { producto_item } from '../interfaces/producto_item.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  cargando = true;
  productos: Producto[] = [];
  productoFiltrado: Producto[] = [];

  constructor(private http: HttpClient) {
    this.cargarProductos();
  }

  private cargarProductos() {
    return new Promise<void>((resolve, reject) => {
      this.http
        .get<Producto[]>(
          'https://ng-temhtml-default-rtdb.firebaseio.com/productos_idx.json'
        )
        .subscribe((resp: Producto[]) => {
          this.productos = resp;
            this.cargando = false;
            resolve();
        });
    });
  }

  getProducto(id: string) {
    return this.http.get<producto_item>(
      `https://ng-temhtml-default-rtdb.firebaseio.com/productos/${id}.json`
    );
  }

  buscarProducto(termino: string) {
    if (this.productos.length === 0) {
      this.cargarProductos().then(() => {
        this.filtrarProducto(termino);
      });
    } else {
      this.filtrarProducto(termino);
    }
  }

  private filtrarProducto(termino: string) {
    console.log(this.productos);
    this.productoFiltrado = [];

    termino = termino.toLocaleLowerCase();

    this.productos.forEach((prod) => {
      const tituloLower = prod.titulo.toLocaleLowerCase();

      if (
        prod.categoria.indexOf(termino) >= 0 ||
        tituloLower.indexOf(termino) >= 0
      ) {
        this.productoFiltrado.push(prod);
      }
    });
  }
}
