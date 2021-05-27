import { AuthGuard } from './guards/auth.guard';
import { ProductoComponent } from './components/producto/producto.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { TableroComponent } from './components/tablero/tablero.component';
import { VentaComponent } from './components/venta/venta.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { LoginComponent } from './components/login/login.component';
import { FooterComponent } from './components/footer/footer.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'prefix',
    redirectTo: 'login'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'tablero',
    component: TableroComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'venta',
    component: VentaComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'producto',
    component: ProductoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'usuario',
    component: UsuarioComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'footer',
    component: FooterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
