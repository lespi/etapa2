import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Usuario, Rol, Periodo } from './usuario.module';
import { LoginService } from './login.service';
import { FormControl, FormBuilder } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import { MatSelect } from '@angular/material';
import { take, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit, OnDestroy {

  @Output() emitUsuarioActivo: EventEmitter<Usuario> = new EventEmitter<Usuario>();
  public usuarioLogeado: Usuario;

  public usuarioLogeadoRol: Rol[] = [];
  public usuarioActivo: Usuario;

  rolAdministrador = false;

  private usuarios: Usuario[] = [
    {
      id_num_sap: 1111,
      per_nombre: 'Klauss Adam'
    },
    {
      id_num_sap: 2222,
      per_nombre: 'Luis Espinoza'
    }
  ];
  public usuarioCtrl: FormControl = new FormControl();
  public usuarioFilterCtrl: FormControl = new FormControl();
  public filteredUsuarios: ReplaySubject<Usuario[]> = new ReplaySubject<Usuario[]>(1);
  @ViewChild('singleSelectUsuario') singleSelectUsuario: MatSelect;
  // tslint:disable-next-line: variable-name
  protected _onDestroy = new Subject<void>();

  // Select Periodo
  private periodos: Periodo[] = [
    {
      peri_fecha_anyo: 2018,
    },
    {
      peri_fecha_anyo: 2019,

    }
  ];
  public periodoCtrl: FormControl = new FormControl();
  public periodoFilterCtrl: FormControl = new FormControl();
  public filteredPeriodos: ReplaySubject<Periodo[]> = new ReplaySubject<Periodo[]>(1);
  @ViewChild('singleSelectPeriodo') singleSelectPeriodo: MatSelect;

  constructor(private fb: FormBuilder,
              private loginServices: LoginService) { }

  ngOnInit() {

    this.usuarioCtrl.disable();

    this.usuarioLogin();

    this.periodoCtrl.setValue(this.periodos[0]);
    this.filteredPeriodos.next(this.periodos.slice());
    this.periodoFilterCtrl.valueChanges
            .pipe(takeUntil(this._onDestroy))
            .subscribe(() => {
              this.filterPeriodos();
            });
  }


ngAfterViewInit() {
    this.setInitialValue();
 }

 ngOnDestroy() {
   this._onDestroy.next();
   this._onDestroy.complete();
 }

 protected setInitialValue() {
   this.filteredUsuarios
     .pipe(take(1), takeUntil(this._onDestroy))
     .subscribe(() => {
       this.singleSelectUsuario.compareWith = (a: Usuario, b: Usuario) => a && b && a.id_num_sap === b.id_num_sap;
     });
 }

 protected filterPeriodos() {
  if (!this.periodos) {
    return;
  }
  let search = this.periodoFilterCtrl.value;
  if (!search) {
    this.filteredPeriodos.next(this.periodos.slice());
    return;
  } else {
    search = search.toLowerCase();
  }
  this.filteredPeriodos.next(
    this.periodos.filter(periodo => periodo.peri_fecha_anyo.toString().toLowerCase().indexOf(search) > -1)
  );
}


 protected filterUsuarios() {
   if (!this.usuarios) {
     return;
   }
   let search = this.usuarioFilterCtrl.value;
   if (!search) {
     this.filteredUsuarios.next(this.usuarios.slice());
     return;
   } else {
     search = search.toLowerCase();
   }
   this.filteredUsuarios.next(
     this.usuarios.filter(usuario => usuario.per_nombre.toLowerCase().indexOf(search) > -1)
   );
 }

 async usuarioLogin() {

  await this.loginServices.getSPDataUsuario().then( (resp: [any]) => {
    // console.log('Usuario activo');
    // console.log(resp);
    this.usuarioActivo = new Usuario(
      resp[0].ID,
      resp[0].id_num_sap,
      resp[0].id_carId,
      resp[0].per_fecha_ingreso,
      resp[0].per_login,
      resp[0].per_lugar_trabajo,
      resp[0].per_nombre
    );
    this.emitUsuarioActivo.emit(this.usuarioActivo);
    this.usuarioLogeado = this.usuarioActivo;
    this.usuarioCtrl.setValue(this.usuarioActivo);
    // console.log(this.usuarioActivo);
  });

  await this.loginServices
            .obtenerUsuarioActivoRol(this.usuarioLogeado.per_login)
            .then( (resp: [any]) => {
    // console.log('Rol');
    // console.log(resp);
    // inicializo id_num_sap en formControls

    resp.forEach( element => {

      if ( element.rol_tipo === 'ADMINISTRADOR RRHH') {
        this.usuarioCtrl.enable();
        this.rolAdministrador = true;
      }

      this.usuarioLogeadoRol.push( new Rol(
        element.rol_grupo_adc,
        element.rol_tipo,
        element.id_num_sap_txt
        ));
    });

    this.usuarioLogeado.rol = this.usuarioLogeadoRol;
    // console.log(this.usuarioActivoRol);
    console.log('Usuario Loageado');
    console.log(this.usuarioLogeado);
  });

  if (this.rolAdministrador) {

        // Obener Usuarios
    await this.loginServices.obtenerUsuarios().then( (resp: [any]) => {
      // console.log(resp);
      this.usuarios = [];
      resp.forEach( element => {
        this.usuarios.push( new Usuario(
              element.ID,
              element.id_num_sap,
              element.id_carId,
              element.per_fecha_ingreso,
              element.per_login,
              element.per_lugar_trabajo,
              element.per_nombre
              ));
      });
        // Inicializar select usuarios
        // this.usuarios.find( x => x.ID === this.usuarioActivo.ID)
      // this.usuarioCtrl.setValue(this.usuarios[0]);
      this.filteredUsuarios.next(this.usuarios.slice());
      this.usuarioFilterCtrl.valueChanges
          .pipe(takeUntil(this._onDestroy))
          .subscribe(() => {
            this.filterUsuarios();
          });

    });

  } else {

    this.usuarios.push(this.usuarioLogeado);
    this.filteredUsuarios.next(this.usuarios.slice());
    this.usuarioFilterCtrl.valueChanges
        .pipe(takeUntil(this._onDestroy))
        .subscribe(() => {
          this.filterUsuarios();
        });
  }

  // this.emitEvent.emit(this.usuarioLogeado);
}

 usuarioSeleccionado() {
  this.usuarioActivo = this.usuarios.find( x => x.ID === this.usuarioCtrl.value.ID);
  this.emitUsuarioActivo.emit(this.usuarioActivo);
  console.log('Usuario Activo');
  console.log(this.usuarioActivo);
 }

}
