import { Venta } from 'src/app/models/Venta';
import { Producto } from './Producto';
export class DetalleVenta {

  public id: number;
  public producto: Producto;
  public venta: Venta;
  public cantidad: number;
  public precio: number;
  public fechaaudit: Date;

  constructor() {

  }
}
