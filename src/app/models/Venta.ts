import { DetalleVenta } from './DetalleVenta';
import { Usuario } from './Usuario';
export class Venta {
  public id: number;
  public usuario: Usuario;
  public totalventa: number;
  public efectivoventa: number;
  public cambioventa: number;
  public estatus: number;
  public fechaaudit: Date;
  public detalles: DetalleVenta[];
  constructor(
  ) {
  }
}
