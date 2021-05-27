import { ColmenaService } from 'src/app/services/colmena.service';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/Usuario';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  items: MenuItem[];
  itemsUser: MenuItem[];

  constructor(
    private colServ: ColmenaService,
    private miRouter: Router,
    private confirmationService: ConfirmationService
  ) { }

  cerrarsesion(): void {
    this.colServ.isLogIn = false;
    this.miRouter.navigate(['login']);
  }

  confirmCerrar(): void {
    this.confirmationService.confirm({
      message: '¿Estás seguro de cerrar sesión?',
      header: 'Cerrar sesión',
      acceptLabel: 'Si',
      accept: () => {
        this.cerrarsesion();
      }
    });
  }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Tablero',
        icon: 'pi pi-fw pi-shopping-cart',
        routerLink: 'tablero'
      },
      {
        label: 'Ventas',
        icon: 'pi pi-fw pi-wallet',
        routerLink: 'venta'
      },
      {
        label: 'Productos',
        icon: 'pi pi-fw pi-book',
        routerLink: 'producto'
      },
      {
        label: 'Usuarios',
        icon: 'pi pi-fw pi-users',
        routerLink: 'usuario'
      }
    ];

    this.itemsUser = [
      {
        label: 'Cerrar sesión',
        icon: 'pi pi-sign-out',
        command: () => {
          this.cerrarsesion();
        }
      }
    ];

  }

}
