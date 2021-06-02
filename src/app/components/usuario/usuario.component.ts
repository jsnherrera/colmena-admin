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
  validSubmit = false;

  constructor(
    private colmenaServ: ColmenaService,
    private confirmationService: ConfirmationService,
    private cryptoServ: CryptoService,
    private messageService: MessageService
  ) { }

  showToast(severityToast: string, detail: string): void {
    this.messageService.add({ severity: severityToast, summary: 'Alerta', detail });
  }

  getUsuarios(): void {
    this.pbLoading = true;
    this.usuarios = [];
    this.colmenaServ.getUsuarios().subscribe(
      (result: any) => {
        for (const user of result.usuarios) {
          user.password = this.cryptoServ.decrypt(user.password);
          this.usuarios.push(user);
        }
        // this.usuarios = result.usuarios;
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
    this.selectedUser.estatus = 1;
    this.strTitulo = 'Nuevo usuario';
  }

  editarUsuario(): void {
    // this.selectedUser.password = this.cryptoServ.decrypt(this.selectedUser.password);
    // this.selectedUserModal = Object.assign({}, this.selectedUser);
    this.displayMaximizable = true;
    this.strTitulo = 'Editar usuario';
  }

  guardarUsuario(strOper: string): void {

    if (this.selectedUser &&
      this.selectedUser.nombreUsuario &&
      this.selectedUser.nombre &&
      this.selectedUser.email &&
      this.selectedUser.password) {

      if (strOper === 'eliminar') {
        if (this.selectedUser.id === this.colmenaServ.userLogin.id) {
          this.showToast(severity.error, 'No es posible eliminar el usuario con el que estas logueado');
          return;
        }
        this.selectedUser.estatus = 0;
      }

      this.colmenaServ.saveUsuario(this.selectedUser).subscribe(
        (result: any) => {
          if (result.codigo === 0) {
            if (this.strTitulo === 'Nuevo usuario') {
              this.usuarios.push(result.usuario);
            }
            if (strOper === 'eliminar') {
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
    this.validSubmit = false;
  }

  confirmDelete(): void {
    this.confirmationService.confirm({
      message: '¿Estás seguro de eliminar este usuario?',
      acceptLabel: 'Si',
      header: 'Alerta',
      rejectButtonStyleClass: 'p-button-secondary',
      accept: () => {
        this.strTitulo = '';
        this.guardarUsuario('eliminar');
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
