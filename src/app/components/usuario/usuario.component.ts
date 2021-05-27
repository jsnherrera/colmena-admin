import { Usuario } from './../../models/Usuario';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { ColmenaService } from 'src/app/services/colmena.service';
import { CryptoService } from 'src/app/services/crypto.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {

  usuarios: Usuario[] = [];
  pbLoading = false;
  rows = 15;
  selectedUser = new Usuario();
  items: MenuItem[];
  strTitulo = '';
  displayMaximizable: boolean;

  constructor(
    private colmenaServ: ColmenaService,
    private confirmationService: ConfirmationService,
    private cryptoServ: CryptoService,
    private messageService: MessageService
  ) { }

  showToast(severityToast: string, summary: string, detail: string): void {
    this.messageService.add({ severity: severityToast, summary, detail });
  }

  getUsuarios(): void {
    this.pbLoading = true;
    this.usuarios = [];
    this.colmenaServ.getUsuarios().subscribe(
      (result: any) => {
        this.usuarios = result.usuarios;
        this.pbLoading = false;
      }, err => {
        console.log(err);
        this.pbLoading = false;
      }
    );
  }

  nuevoUsuario(): void {
    this.displayMaximizable = true;
    this.selectedUser = new Usuario();
    this.strTitulo = 'Nuevo usuario';
  }

  editarUsuario(): void {
    this.selectedUser.password = this.cryptoServ.decrypt(this.selectedUser.password);
    this.displayMaximizable = true;
    this.strTitulo = 'Editar usuario';
  }

  guardarUsuario(): void {
    if (this.selectedUser) {
      if (this.strTitulo !== '') {
        this.selectedUser.password = this.cryptoServ.encrypt(this.selectedUser.password);
      }
      if (this.selectedUser.id === this.colmenaServ.userLogin.id) {
        this.showToast(severity.error, 'Alerta', 'No es posible eliminar el usuario con el que estas logueado');
      }
      else {
        this.colmenaServ.saveUsuario(this.selectedUser).subscribe(
          (result: any) => {
            if (result.codigo === 0) {
              if (this.strTitulo === 'Nuevo usuario') {
                this.usuarios.push(result.usuario);
              }
              if (this.selectedUser.estatus === 0) {
                this.usuarios.splice(this.usuarios.lastIndexOf(this.selectedUser), 1);
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
  }

  confirmDelete(): void {
    this.confirmationService.confirm({
      message: '¿Estás seguro de eliminar este usuario?',
      acceptLabel: 'Si',
      accept: () => {
        this.strTitulo = '';
        this.selectedUser.estatus = 0;
        this.guardarUsuario();
      }
    });
  }

  ngOnInit(): void {
    this.getUsuarios();

    this.items = [
      { label: 'Editar', icon: 'pi pi-fw pi-pencil', command: () => this.editarUsuario() },
      { label: 'Eliminar', icon: 'pi pi-fw pi-times', command: () => this.confirmDelete() }
    ];

  }

}

enum severity {
  success = 'success',
  info = 'info',
  warn = 'warn',
  error = 'error',
  custom = 'custom'
}
