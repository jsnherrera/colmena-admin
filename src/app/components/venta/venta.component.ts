import { Venta } from './../../models/Venta';
import { Component, OnInit } from '@angular/core';
import { ColmenaService } from 'src/app/services/colmena.service';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.scss']
})
export class VentaComponent implements OnInit {

  ventas: Venta[] = [];
  pbLoading = false;
  rows = 15;

  constructor(private colmenaServ: ColmenaService) { }

  getVentas(): void {
    this.pbLoading = true;
    this.ventas = [];
    this.colmenaServ.getVentas().subscribe(
      (result: any) => {
        this.ventas = result.ventas;
        this.pbLoading = false;
      }, err => {
        console.log(err);
        this.pbLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.getVentas();
  }

}
