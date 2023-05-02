import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { producto_item } from 'src/app/interfaces/producto_item.interface';
import { ProductosService } from 'src/app/services/productos.service';
import { Producto } from '../../interfaces/producto.interface';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent {
  producto: producto_item | undefined;
  id: string | undefined;

  constructor(
    private rout: ActivatedRoute,
    public prodoctoService: ProductosService
  ) {}

  ngOnInit() {
    this.rout.params.subscribe((parametros) => {
      this.prodoctoService
        .getProducto(parametros['id'])
        .subscribe((producto: producto_item) => {
          this.id = parametros['id'];
          this.producto = producto;
        });
    });
  }
}
