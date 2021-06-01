import { DetalleVenta } from './../../models/DetalleVenta';
import { Producto } from './../../models/Producto';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { ColmenaService } from 'src/app/services/colmena.service';
import { Venta } from 'src/app/models/Venta';

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.scss']
})
export class TableroComponent implements OnInit, AfterViewInit {

  products: Producto[];
  sortOptions: SelectItem[];
  sortOrder: number;
  sortField: string;
  strTitulo = 'Ticket';
  displayMaximizable = false;
  efectivo = 0.0;
  cambio = 0.0;
  total = 0.0;
  cantidad = 0;

  miTiket: Producto[];

  constructor(
    private colmenaServ: ColmenaService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

  verTicket(): void {
    if (this.miTiket.length > 0) {
      this.displayMaximizable = true;
      this.calcularTotales();
    }
    else {
      this.showToast(severity.warn, 'No hay productos en el ticket');
    }
  }

  calcularTotales(): void {
    this.total = 0.0;
    for (const ticket of this.miTiket) {
      this.total += ticket.precioticket;
    }
    if (this.efectivo > 0) {
      this.cambio = this.efectivo - this.total;
    }
  }

  addCarrito(producto: Producto): void {
    if (producto.cantidad > 0) {
      const lastIndex = this.miTiket.lastIndexOf(producto);
      if (lastIndex > -1) {
        this.miTiket[lastIndex].cantidadticket++;
        this.miTiket[lastIndex].precioticket += producto.precioventa;
      }
      else {
        producto.cantidadticket = 1;
        producto.precioticket = producto.precioventa;
        this.miTiket.push(producto);
      }
      this.showToast(severity.success, producto.nombre + ' agregado al ticket');
    }
  }

  addCantidad(ticket: Producto): void {
    const cantidadAux = ticket.cantidadticket + 1;
    if (cantidadAux >= 0) {
      ticket.cantidadticket++;
      ticket.precioticket = ticket.cantidadticket * ticket.precioventa;
      this.calcularTotales();
    }
  }

  restarCantidad(ticket: Producto): void {
    const cantidadAux = ticket.cantidadticket - 1;
    if (cantidadAux >= 0) {
      ticket.cantidadticket--;
      ticket.precioticket = ticket.cantidadticket * ticket.precioventa;
      this.calcularTotales();
    }
  }

  getProductos(): void {
    this.products = [];
    this.colmenaServ.getProductosObs().subscribe(
      (result: any) => {
        this.products = result.productos;
      }
    );
  }

  showToast(severityToast: string, detail: string): void {
    this.messageService.add({ severity: severityToast, summary: 'Alerta', detail });
  }

  guardarVenta(): void {
    if (this.total > 0 && this.efectivo >= this.total) {

      const detalleventa: DetalleVenta[] = [];
      const venta = new Venta();
      venta.cambioventa = this.cambio;
      venta.efectivoventa = this.efectivo;
      venta.fechaaudit = new Date();
      venta.totalventa = this.total;
      venta.usuario = this.colmenaServ.userLogin;

      for (const ticket of this.miTiket) {
        const dv = new DetalleVenta();
        dv.cantidad = ticket.cantidadticket;
        dv.producto = ticket;
        dv.precio = ticket.precioventa;
        dv.fechaaudit = new Date();
        detalleventa.push(dv);
      }

      venta.detalles = detalleventa;
      venta.estatus = 1;

      this.colmenaServ.saveVenta(venta).subscribe(
        (result: any) => {
          if (result.codigo === 0) {
            this.cambio = 0.0;
            this.efectivo = 0.0;
            this.total = 0.0;
            this.miTiket = [];
            this.displayMaximizable = false;
            this.showToast(severity.success, 'La venta se guardo correctamente');
          }
          else {
            this.showToast(severity.error, result);
          }
        }, err => {
          console.log(err);
          this.showToast(severity.error, err);
        }
      );
    }
    else {
      this.showToast(severity.warn, 'El total/efectivo de la venta no puede ser de $0.00');
    }
  }

  limpiarTicket(): void {
    this.cambio = 0.0;
    this.efectivo = 0.0;
    this.total = 0.0;
    this.miTiket = [];
    this.displayMaximizable = false;
  }

  confirmVenta(): void {
    this.confirmationService.confirm({
      message: '¿Estás seguro de guardar la venta?',
      acceptLabel: 'Si',
      header: 'Alerta',
      rejectButtonStyleClass: 'p-button-secondary',
      accept: () => {
        this.guardarVenta();
      }
    });
  }

  confirmLimpiar(): void {
    this.confirmationService.confirm({
      message: '¿Estás seguro de eliminar el ticket?',
      acceptLabel: 'Si',
      header: 'Alerta',
      rejectButtonStyleClass: 'p-button-secondary',
      accept: () => {
        this.limpiarTicket();
      }
    });
  }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {

    this.miTiket = [];

    this.getProductos();

  }

}

enum severity {
  success = 'success',
  info = 'info',
  warn = 'warn',
  error = 'error',
  custom = 'custom'
}
