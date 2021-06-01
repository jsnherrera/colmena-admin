import { Component, OnInit } from '@angular/core';
import { ConfirmationService, LazyLoadEvent, MenuItem } from 'primeng/api';
import { Producto } from 'src/app/models/Producto';
import { ColmenaService } from 'src/app/services/colmena.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent implements OnInit {

  productos: Producto[] = [];
  pbLoading = false;
  rows = 15;
  selectedProduct = new Producto(0, '', '', '', 0.0, 0.0, 0, '', new Date(), 0, 1, 0, 0);
  items: MenuItem[];
  strTitulo = '';
  displayMaximizable: boolean;

  constructor(
    private colmenaServ: ColmenaService,
    private confirmationService: ConfirmationService) { }

  getProductos(): void {
    this.pbLoading = true;
    this.productos = [];
    this.colmenaServ.getProductosObs().subscribe(
      (result: any) => {
        this.productos = result.productos;
        this.pbLoading = false;
      }, err => {
        console.log(err);
        this.pbLoading = false;
      }
    );
  }

  nuevoProducto(): void {
    this.displayMaximizable = true;
    this.selectedProduct = new Producto(0, '', '', '', 0.0, 0.0, 0, '', new Date(), 0, 1, 0, 0);
    this.strTitulo = 'Nuevo producto';
  }

  editarProducto(): void {
    this.displayMaximizable = true;
    this.strTitulo = 'Editar producto';
  }

  guardarProducto(): void {
    if (this.selectedProduct) {
      this.colmenaServ.saveProducto(this.selectedProduct).subscribe(
        (result: any) => {
          if (result.codigo === 0) {
            if (this.strTitulo === 'Nuevo producto') {
              this.productos.push(result.producto);
            }
            if (this.selectedProduct.estatus === 0) {
              this.productos.splice(this.productos.lastIndexOf(this.selectedProduct), 1);
            }
            this.displayMaximizable = false;
          }
          else {
            console.log(result);
          }
        }, err => {
          console.log(err);
        }
      );
    }
  }

  confirmDelete(): void {
    this.confirmationService.confirm({
      message: '¿Estás seguro de eliminar este producto?',
      acceptLabel: 'Si',
      header: 'Alerta',
      rejectButtonStyleClass: 'p-button-secondary',
      accept: () => {
        this.strTitulo = '';
        this.selectedProduct.estatus = 0;
        this.guardarProducto();
      }
    });
  }

  loadCarsLazy(event: LazyLoadEvent): void {

  }

  viewProduct(selectedProduct: Producto): void {

  }

  deleteProduct(selectedProduct: Producto): void {

  }

  ngOnInit(): void {
    this.getProductos();

    this.items = [
      { label: 'Editar', icon: 'pi pi-fw pi-pencil', command: () => this.editarProducto() },
      { label: 'Eliminar', icon: 'pi pi-fw pi-times', command: () => this.confirmDelete() }
    ];

  }

}
