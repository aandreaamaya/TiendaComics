import { Component } from '@angular/core';
import { AuthenticationService } from '../_service/authentication.service';

@Component({
  selector: 'app-secured',
  templateUrl: './secured.component.html',
  styleUrl: './secured.component.css'
})
export class SecuredComponent {

  constructor(private servicioAutenticacion: AuthenticationService){}

  logout(){
    console.log('Cerrando Sesión');
    this.servicioAutenticacion.logOut();
  }

}
