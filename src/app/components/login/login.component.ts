import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ColmenaService } from 'src/app/services/colmena.service';
import { CryptoService } from 'src/app/services/crypto.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {

  @ViewChild('inuser', { static: true }) usernameElement: ElementRef;
  @ViewChild('inpass', { static: true }) passwordElement: ElementRef;

  username = '';
  password = '';
  validLogin = false;
  displayMaximizable = false;
  usernameForget = '';
  validLoginForget = false;

  constructor(
    private colServ: ColmenaService,
    private miRouter: Router,
    private cryptoServ: CryptoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
  }

  enviarMail(): void {
    if (this.usernameForget) {
      this.displayMaximizable = false;
      this.showSToast(severity.success, 'Tu password fue enviado a tu correo');
    }
    this.validLoginForget = true;
  }

  showMaximizableDialog(): void {
    this.displayMaximizable = true;
  }

  keypressUsername(event: any): void {
    if (event.code === 'Enter') {
      this.passwordElement.nativeElement.focus();
    }
  }

  keypressPassword(event: any): void {
    if (event.code === 'Enter') {
      this.login();
    }
  }

  login(): void {
    if (this.username && this.password) {
      this.colServ.getUsuarioLogin(this.username).subscribe(
        (result: any) => {
          if (result.codigo === 0) {
            if (result.usuario) {
              if (this.password === this.cryptoServ.decrypt(result.usuario.password)) {
                this.colServ.isLogIn = true;
                this.colServ.userLogin = result.usuario;
                this.miRouter.navigate(['tablero']);
              }
            }
            if (!this.colServ.isLogIn) {
              this.showSToast(severity.error, 'Usuario/Email incorrectos');
            }
          }
          else {
            console.log(result);
          }
        }
      );
    }
    this.validLogin = true;
  }

  showSToast(severityToast: string, detail: string): void {
    this.messageService.add({ severity: severityToast, summary: 'Alerta', detail });
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.usernameElement.nativeElement.focus();
    }, 3000);
  }

}

enum severity {
  success = 'success',
  info = 'info',
  warn = 'warn',
  error = 'error',
  custom = 'custom'
}
