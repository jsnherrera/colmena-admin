import { Venta } from './../../models/Venta';
import { Component, OnInit } from '@angular/core';
import { ColmenaService } from 'src/app/services/colmena.service';
import { ConfirmationService, MenuItem } from 'primeng/api';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.scss']
})
export class VentaComponent implements OnInit {

  ventas: Venta[] = [];
  pbLoading = false;
  rows = 15;
  fechaini: Date;
  fechafin: Date;
  items: MenuItem[];
  selectedVenta = new Venta();

  constructor(
    private colmenaServ: ColmenaService,
    private confirmationService: ConfirmationService
  ) { }

  limpiar(): void {
    this.fechaini = null;
    this.fechafin = null;
    this.ventas = [];
  }

  getVentas(): void {
    let fechainiAux: Date;
    let fechafinAux: Date;
    if (!this.fechaini) {
      fechainiAux = new Date();
      fechainiAux.setHours(0, 0, 0, 0);
    }
    else {
      fechainiAux = this.fechaini;
      fechainiAux.setHours(0, 0, 0, 0);
    }
    if (!this.fechafin) {
      fechafinAux = new Date();
      fechafinAux.setHours(23, 59, 59, 0);
    }
    else {
      fechafinAux = this.fechafin;
      fechafinAux.setHours(23, 59, 59, 0);
    }
    this.pbLoading = true;
    this.ventas = [];
    this.colmenaServ.getVentas(fechainiAux, fechafinAux).subscribe(
      (result: any) => {
        this.ventas = result.ventas;
        this.pbLoading = false;
      }, err => {
        console.log(err);
        this.pbLoading = false;
      }
    );
  }

  guardarVenta(): void {
    console.log(this.selectedVenta);
    this.selectedVenta.estatus = 0;
    this.colmenaServ.saveVenta(this.selectedVenta).subscribe(
      (result: any) => {
        if (result.codigo !== 0) {
          console.log(result);
        }
      }, err => {
        console.log(err);
      }
    );
  }

  confirmDelete(): void {
    this.confirmationService.confirm({
      message: '¿Estás seguro de eliminar esta venta?',
      acceptLabel: 'Si',
      rejectButtonStyleClass: 'p-button-secondary',
      header: 'Alerta',
      accept: () => {
        this.guardarVenta();
      }
    });
  }

  ngOnInit(): void {
    this.getVentas();
    this.items = [
      { label: 'Eliminar', icon: 'pi pi-fw pi-times', command: () => this.confirmDelete() }
    ];
  }

}
