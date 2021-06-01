import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { DataViewModule } from 'primeng/dataview';
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { TabViewModule } from 'primeng/tabview';
import { MenubarModule } from 'primeng/menubar';
import { TableModule } from 'primeng/table';
import { OrderListModule } from 'primeng/orderlist';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { TooltipModule } from 'primeng/tooltip';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { MenuModule } from 'primeng/menu';
import { CalendarModule } from 'primeng/calendar';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ConfirmPopupModule } from 'primeng/confirmpopup';

import { ColmenaService } from './services/colmena.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CryptoService } from './services/crypto.service';


import { AppComponent } from './app.component';
import { TableroComponent } from './components/tablero/tablero.component';
import { MenuComponent } from './components/menu/menu.component';
import { ProductoComponent } from './components/producto/producto.component';
import { VentaComponent } from './components/venta/venta.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { LoginComponent } from './components/login/login.component';
import { FooterComponent } from './components/footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    TableroComponent,
    MenuComponent,
    ProductoComponent,
    VentaComponent,
    UsuarioComponent,
    LoginComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataViewModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    PanelModule,
    InputTextModule,
    RatingModule,
    ButtonModule,
    DropdownModule,
    TabViewModule,
    MenubarModule,
    TableModule,
    OrderListModule,
    VirtualScrollerModule,
    TooltipModule,
    ContextMenuModule,
    DialogModule,
    ConfirmDialogModule,
    ToastModule,
    MessagesModule,
    MessageModule,
    AvatarModule,
    AvatarGroupModule,
    MenuModule,
    CalendarModule,
    OverlayPanelModule,
    ConfirmPopupModule
  ],
  providers: [
    ColmenaService,
    ConfirmationService,
    CryptoService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
