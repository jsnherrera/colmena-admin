import { Venta } from 'src/app/models/Venta';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/Producto';
import { Usuario } from '../models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class ColmenaService {

  private baseUrlLocal = 'http://localhost:8080/colmena-admin/v1/api/';
  private baseUrl = 'https://colmena-admin-api.herokuapp.com/colmena-admin/v1/api/';

  public isLogIn = false;
  public userLogin: Usuario;

  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders();
    // this.headers = this.headers.set('Authorization', 'Basic ' + btoa('user:01046f71-6c4f-4200-9041-3646ea02bdc4'));
    this.headers = this.headers.set('Content-Type', 'application/json');
  }

  async getProductosProm(): Promise<any> {
    const data = await this.http.get(this.baseUrl + 'getAllProductos', { headers: this.headers }).toPromise();
    return data;
  }

  getProductosObs(): Observable<any> {
    return this.http.get(this.baseUrl + 'getAllProductos', { headers: this.headers });
  }

  saveProducto(producto: Producto): Observable<any> {
    producto.fechaaudit = new Date();
    return this.http.post(this.baseUrl + '/saveProducto', JSON.stringify(producto), { headers: this.headers });
  }

  deleteProducto(id: number): Observable<any> {
    return this.http.get(this.baseUrl + '/deleteProducto/' + id, { headers: this.headers });
  }

  getUsuarioLogin(username: string): Observable<any> {
    /*let params = new HttpParams();
    params = params.set('nombreUsuario ', username);
    params = params.set('password ', username);*/
    return this.http.get(this.baseUrl + 'getUsuarioLogin/' + username, { headers: this.headers });
  }

  getUsuarios(): Observable<any> {
    return this.http.get(this.baseUrl + 'getAllUsuarios', { headers: this.headers });
  }

  saveUsuario(usuario: Usuario): Observable<any> {
    usuario.fechaaudit = new Date();
    return this.http.post(this.baseUrl + '/saveUsuario', JSON.stringify(usuario), { headers: this.headers });
  }

  deleteUsuario(id: number): Observable<any> {
    return this.http.get(this.baseUrl + '/deleteUsuario/' + id, { headers: this.headers });
  }

  getVentas(): Observable<any> {
    return this.http.get(this.baseUrl + 'getAllVentas');
  }

  saveVenta(venta: Venta): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.post(this.baseUrl + '/saveVenta', JSON.stringify(venta), { headers });
  }

  deleteVenta(id: number): Observable<any> {
    return this.http.get(this.baseUrl + '/deleteVenta/' + id);
  }

}
