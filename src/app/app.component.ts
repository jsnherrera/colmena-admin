import { Component } from '@angular/core';
import { ColmenaService } from './services/colmena.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'colmena-admin';

  constructor(public colServ: ColmenaService) {

  }
}
