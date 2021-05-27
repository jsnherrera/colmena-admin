export class Producto {
  constructor(
    public id: number,
    public nombre: string,
    public descripcion: string,
    public categoria: string,
    public preciocompra: number,
    public precioventa: number,
    public cantidad: number,
    public imagen: string,
    public fechaaudit: Date,
    public rating: number,
    public estatus: number,
    public cantidadticket: number,
    public precioticket: number,
  ) {
  }
}
