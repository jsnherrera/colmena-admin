import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  secretKey = 'Secret Passphrase';

  constructor() { }

  encrypt(strCadena: string): string {
    return CryptoJS.AES.encrypt(strCadena, this.secretKey).toString();
  }

  decrypt(strCadena: string): string {
    return CryptoJS.AES.decrypt(strCadena, this.secretKey).toString(CryptoJS.enc.Utf8);
  }

}
