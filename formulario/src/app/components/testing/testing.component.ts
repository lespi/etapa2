import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.scss']
})
export class TestingComponent implements OnInit {
   @ViewChild(LoginComponent) loginComponent: LoginComponent;
 // @Input() loginComponent: LoginComponent;

  constructor() { }

  ngOnInit() {


  }

  obtener(){
    console.log('Usuario Logiado' + this.loginComponent.usuarioLogeado.ID);
    console.log('Usuario activo' + this.loginComponent.usuarioActivo.ID);
  }

}
