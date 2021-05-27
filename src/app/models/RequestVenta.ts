import { DetalleVenta } from './DetalleVenta';
import { Venta } from 'src/app/models/Venta';
export class RequestVenta {
  constructor(
    public venta: Venta,
    public detalleVentas: DetalleVenta[]
  ) {

  }
}
