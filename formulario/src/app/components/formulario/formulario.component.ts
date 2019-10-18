import { Component, OnInit, ViewEncapsulation, AfterViewInit, OnDestroy, ViewChild, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { map, startWith, takeUntil, take } from 'rxjs/operators';
import { Cargo, InfoGeneral, InfoEspecifica, Usuario, Periodo, Rol } from 'src/app/models/etapa2.module';
import { Etapa2Service } from '../../services/etapa2.service';
import { MatSelect } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import {
  INICIALIZARFORMESPECIFICA,
  INICIALIZARFORMGENERAL,
  selectAjuste,
  CAMPOSCOMPETENCIAS,
  CAMPOSCONDICIONES,
  CAMPOSMOTIVACIONES,
  CAMPOSREQUERIMIENTOS
} from './data';
import { Form } from '@pnp/sp/src/forms';

export interface CamposInfoEspecifica {
  nombreCampo: string;
  nombreMostrar: string;
  nombreCampoAjuste: string;
  anyo?: string;
  nombreMostrar1?: string;
  nombreCampo1?: string;
}


@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TemplateComponent implements OnInit, AfterViewInit, OnDestroy {

  usuarioActivo: Usuario;

  cargoSel: Cargo;
  cargoSel2: Cargo;
  cargoSel3: Cargo;
  infoEsSel: InfoEspecifica = null;
  infoEsSel2: InfoEspecifica = null;
  infoEsSel3: InfoEspecifica = null;
  infogeSel: InfoGeneral = null;

  infoEspecifica: InfoEspecifica[] = [];
  nombresFromGroup = ['infoEspecificaForm1', 'infoEspecificaForm2', 'infoEspecificaForm3'];

  selectAjuste = selectAjuste;
  selectCompetencia = [];
  selectMotivaciones = [];

  infoGeneralForm: FormGroup;
  infoEspecificaForm1: FormGroup;
  infoEspecificaForm2: FormGroup;
  infoEspecificaForm3: FormGroup;
  infoEspecificaForm: FormGroup;

  inicializarFromEspecifica = INICIALIZARFORMESPECIFICA;
  inicializarFromGeneral = INICIALIZARFORMGENERAL;

  camposRequerimientos: CamposInfoEspecifica[] = CAMPOSREQUERIMIENTOS;
  camposCompetencias: CamposInfoEspecifica[] = CAMPOSCOMPETENCIAS;
  camposCondiciones: CamposInfoEspecifica[] = CAMPOSCONDICIONES;
  camposMotivaciones: CamposInfoEspecifica[] = CAMPOSMOTIVACIONES;

  public guardando = false;
  public cambiosFormGeneral = false;
  cambiosFormEspecifica: boolean[] = [false, false, false];
  cambiosAux = 0;
  auxInfoEsp = 0;
  // Select Cargo 1
  private cargos: Cargo[] = [
    {
      ID: 1,
      car_nombre: 'Especialista Avansado de Productividad',
      car_direccion: 'Proyectos'
    },
    {
      ID: 2,
      car_nombre: 'Control Gestión',
      car_direccion: 'Proyectos'
    }
  ];
  public cargoCtrl: FormControl = new FormControl();
  public cargoFilterCtrl: FormControl = new FormControl();
  public filteredCargos: ReplaySubject<Cargo[]> = new ReplaySubject<Cargo[]>(1);
  @ViewChild('singleSelectCargo') singleSelectCargo: MatSelect;

  // Select Cargo 2
  private cargos2: Cargo[] = [
    {
      ID: 1,
      car_nombre: 'Especialista Avansado de Productividad',
      car_direccion: 'Proyectos'
    },
    {
      ID: 2,
      car_nombre: 'Control Gestión',
      car_direccion: 'Proyectos'
    }
  ];
  public cargo2Ctrl: FormControl = new FormControl();
  public cargo2FilterCtrl: FormControl = new FormControl();
  public filteredCargos2: ReplaySubject<Cargo[]> = new ReplaySubject<Cargo[]>(1);
  @ViewChild('singleSelectCargo2') singleSelectCargo2: MatSelect;

  // Select Cargo 3
  private cargos3: Cargo[] = [
    {
      ID: 1,
      car_nombre: 'Especialista Avansado de Productividad',
      car_direccion: 'Proyectos'
    },
    {
      ID: 2,
      car_nombre: 'Control Gestión',
      car_direccion: 'Proyectos'
    }
  ];
  public cargo3Ctrl: FormControl = new FormControl();
  public cargo3FilterCtrl: FormControl = new FormControl();
  public filteredCargos3: ReplaySubject<Cargo[]> = new ReplaySubject<Cargo[]>(1);
  @ViewChild('singleSelectCargo3') singleSelectCargo3: MatSelect;

// tslint:disable-next-line: variable-name
  protected _onDestroy = new Subject<void>();
  // @Input() placeholderLabel = 'Suche';
  // @Input() noEntriesFoundLabel = 'Keine Optionen gefunden';

  arrayCargoCtrl = [this.cargoCtrl, this.cargo2Ctrl, this.cargo3Ctrl];
  arrayCargos = []; // Se actualiza al obtener el array de cargos

  constructor(private fb: FormBuilder,
              private etapa2Service: Etapa2Service,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    // Obtener Cargos
    this.etapa2Service.obtenerCargos().then( (resp: [any]) => {
      // console.log(resp);
      this.cargos = [];
      resp.forEach( element => {
        this.cargos.push( new Cargo(
              element.ID,
              element.car_nombre,
              element.car_direccion,
              element.car_mision,
              element.car_req_cono,
              element.car_req_esp,
              element.car_req_exp_esp,
              element.car_req_exp_general,
              element.car_req_exp_lider,
              element.car_req_form,
              element.car_rotacion
              ));
      });
      console.log(this.cargos);
      this.cargos2 = this.cargos;
      this.cargos3 = this.cargos;
      this.arrayCargos = [this.cargos, this.cargos2, this.cargos3];
       // Inicializar select cargos
      // this.cargoCtrl.setValue(this.cargos[0]);
      this.filteredCargos.next(this.cargos.slice());
      this.cargoFilterCtrl.valueChanges
           .pipe(takeUntil(this._onDestroy))
           .subscribe(() => {
            this.filterCargos();
           });

      this.filteredCargos2.next(this.cargos2.slice());
      this.cargo2FilterCtrl.valueChanges
                .pipe(takeUntil(this._onDestroy))
                .subscribe(() => {
                 this.filterCargos2();
                });

      this.filteredCargos3.next(this.cargos3.slice());
      this.cargo3FilterCtrl.valueChanges
           .pipe(takeUntil(this._onDestroy))
           .subscribe(() => {
            this.filterCargos3();
           });
    });


    this.etapa2Service.obtenerCompetencias().then( (resp: [any]) => {
      console.log('-----------------Obtener competencias');
      console.log(resp);
      resp.forEach(element => {
        this.selectCompetencia.push(element.com_descripcion);
      });
      console.log(this.selectCompetencia);
    });


    // Creamos el Form
    this.createForms();

    console.log(this.infoGeneralForm);
    console.log(this.infoEspecificaForm);
    // console.log(this.infoEspecificaForm);
    // console.log(this.infoEspecificaForm.get(this.nombresFromGroup[0]).value);
    // probar cambiar el valor del campo de este subgroup form
    // this.infoEspecificaForm.get(this.nombresFromGroup[0]).patchValue({
    //   street: 'bye'
    // });
    // console.log(this.infoEspecificaForm.get(this.nombresFromGroup[0]).value);
  }

  createForms() {

    this.infoGeneralForm = this.fb.group(this.inicializarFromGeneral);
    this.infoEspecificaForm = this.fb.group({
      infoEspecificaForm1: this.fb.group(this.inicializarFromEspecifica),
      infoEspecificaForm2: this.fb.group(this.inicializarFromEspecifica),
      infoEspecificaForm3: this.fb.group(this.inicializarFromEspecifica)

    });

    // Defino FormControls requiered
    /*
    this.nombresFromGroup.forEach(element => {
      this.infoEspecificaForm.get(element).get('id_carId').setValidators([Validators.required]);
    });
*/
    // Observar formularios con cambios
    /*
    this.infoGeneralForm.valueChanges.subscribe(() => {
      this.cambiosFormGeneral = true;
      console.log(this.cambiosFormGeneral);
    });

    this.infoEspecificaForm.get('infoEspecificaForm1').valueChanges.subscribe(() => {
      this.cambiosFormEspecifica[0] = true;
      console.log(this.cambiosFormEspecifica);
    });
    this.infoEspecificaForm.get('infoEspecificaForm2').valueChanges.subscribe(() => {
      this.cambiosFormEspecifica[1] = true;
      console.log(this.cambiosFormEspecifica);
    });
    this.infoEspecificaForm.get('infoEspecificaForm3').valueChanges.subscribe(() => {
      this.cambiosFormEspecifica[2] = true;
      console.log(this.cambiosFormEspecifica);
    });
*/
  }

  async onSubmitInfoGeneral() {

    this.guardando = true;
    console.log(this.infoGeneralForm.value);
    const elementInfoId = this.infoGeneralForm.get('ID').value;
    const elementInfoValue = this.infoGeneralForm.value;
    const objetoAuxiliar = elementInfoValue;
    delete objetoAuxiliar.ID;

    if ( elementInfoId !== '' ) {
      console.log('Existe info general objeto');
      await this.etapa2Service.actualizarInfoGeneral(elementInfoValue, elementInfoId).then( () => {
        this.snackBar.open('Información general guardada', 'x', {
          duration: 5000,
        });
        this.guardando = false;
      });
    } else {
      console.log('NO Existe info general objeto');
      console.log(objetoAuxiliar);
      await this.etapa2Service.guardarInfoGeneral(objetoAuxiliar).then( () => {
        this.infoGenSel().then( () => {
          this.snackBar.open('Información general guardada', 'x', {
            duration: 5000,
          });
          this.guardando = false;
        });
      });
    }

  }

  async onSubmitInfoEspecifica() {

    this.guardando = true;
    console.log(this.infoEspecificaForm.value);

    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.nombresFromGroup.length; i++) {

      const element = this.nombresFromGroup[i];
      const elementInfoId = this.infoEspecificaForm.get(element).get('ID').value;
      const elementInfoIdCarId = this.infoEspecificaForm.get(element).get('id_carId').value;
      const elementInfoValue = this.infoEspecificaForm.get(element).value;
      console.log(this.infoEspecificaForm.get(element).get('ID').value );

      if (elementInfoId !== '') {
        console.log('Existe info especifica objeto');
        console.log(elementInfoValue );
        await this.etapa2Service.actualizarInfoEspecifica(elementInfoValue, elementInfoId).then(() => {
              if ( i === this.nombresFromGroup.length - 1 ) {
                this.guardando = false;
                this.snackBar.open('Información específica guardada', 'x', {
                      duration: 5000,
                    });
              }
            });
      } else {
        console.log('NO Existe info especifica objeto');
        const objetoAuxiliar = elementInfoValue;
        delete objetoAuxiliar.ID;
        console.log(objetoAuxiliar);
        // no envío el id_carId si el usuario no lo completo
        if (elementInfoIdCarId === '') {
        delete objetoAuxiliar.id_carId;
        }

        await this.etapa2Service.guardarInfoEspecifica(objetoAuxiliar).then(() => {
          if ( i === this.nombresFromGroup.length - 1 ) {
            this.infoEspSel().then( () => {
              this.guardando = false;
              this.snackBar.open('Información específica guardada', 'x', {
                    duration: 5000,
                  });
            });
          }
        });
      }
    }
  }

  submitEtapa2() {
        this.onSubmitInfoGeneral().then( () => {
          this.onSubmitInfoEspecifica();
        });

  }

// Select usuarios
  ngAfterViewInit() {
     // this.setInitialValue();
    // this.infoGenSel();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  protected filterCargos() {
    if (!this.cargos) {
      return;
    }
    let search = this.cargoFilterCtrl.value;
    if (!search) {
      this.filteredCargos.next(this.cargos.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredCargos.next(
      this.cargos.filter(cargo => cargo.car_nombre.toLowerCase().indexOf(search) > -1)
    );
  }

  protected filterCargos2() {
    if (!this.cargos2) {
      return;
    }
    let search = this.cargo2FilterCtrl.value;
    if (!search) {
      this.filteredCargos2.next(this.cargos2.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredCargos2.next(
      this.cargos2.filter(cargo => cargo.car_nombre.toLowerCase().indexOf(search) > -1)
    );
  }

  protected filterCargos3() {
    if (!this.cargos3) {
      return;
    }
    let search = this.cargo3FilterCtrl.value;
    if (!search) {
      this.filteredCargos3.next(this.cargos3.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredCargos3.next(
      this.cargos3.filter(cargo => cargo.car_nombre.toLowerCase().indexOf(search) > -1)
    );
  }

  cargoSeleccionado(posicion: number) {

    const cargoAux: Cargo = this.arrayCargos[posicion].find(x => x.ID === this.arrayCargoCtrl[posicion].value.ID);

    this.infoEspecificaForm.get(this.nombresFromGroup[posicion]).patchValue({
      id_carId: cargoAux.ID,
      infe_req_form: cargoAux.car_req_form,
      infe_req_esp: cargoAux.car_req_esp,
      infe_req_cono: cargoAux.car_req_cono,
      infe_req_exp_general: cargoAux.car_req_exp_general,
      infe_req_exp_general_anyo: '',
      infe_req_exp_esp: cargoAux.car_req_exp_esp,
      infe_req_exp_esp_anyo: '',
      infe_req_exp_lider: cargoAux.car_req_exp_lider,
      infe_req_exp_lider_anyo: '',
      infe_req_otro: '',
      infe_comp_1: '',
      infe_comp_2: '',
      infe_comp_3: '',
      infe_comp_4: '',
      infe_comp_5: '',
      infe_comp_6: '',
      infe_cond_jornada: '',
      infe_cond_otro: '',
      infe_mova_1: '',
      infe_mova_2: '',
      infe_mova_3: '',
      infe_mova_4: '',
      infe_mova_5: '',
      infe_direccion: cargoAux.car_direccion,
      infe_rotacion: cargoAux.car_rotacion,
      infe_gerencia: '',
      infe_mision: cargoAux.car_mision,

    });

    console.log(this.infoEspecificaForm.get(this.nombresFromGroup[0]).value);

  }

  async infoEspSel() {
    await this.etapa2Service.obtenerInfoEspecifica(this.usuarioActivo.ID).then( (resp: [any]) => {
      console.log('-----------------Obtener datos info especifica');
      console.log(resp);
      if (resp.length > 0 ) {
        this.auxInfoEsp = 0;
        resp.forEach(element => {
          this.infoEspecificaForm.get(this.nombresFromGroup[this.auxInfoEsp]).patchValue(element);
          const cargoAux: Cargo = this.arrayCargos[this.auxInfoEsp].find(x => x.ID === element.id_carId);
          this.arrayCargoCtrl[this.auxInfoEsp].setValue(cargoAux);
          this.auxInfoEsp ++;
        });
      } else {
        // Inicializar los form group con datos del usuario activo
        this.auxInfoEsp = 0;
        this.nombresFromGroup.forEach(element => {
          this.infoEspecificaForm.get(this.nombresFromGroup[this.auxInfoEsp]).patchValue(this.inicializarFromEspecifica);
          this.infoEspecificaForm.get(element).get('id_num_sapId').setValue(this.usuarioActivo.ID);
          this.infoEspecificaForm.get(element).get('id_periId').setValue(1);
          this.auxInfoEsp ++;
        });
      }
    });
    // console.log(this.infoEspecificaForm);
    console.log(this.infoEspecificaForm.get(this.nombresFromGroup[0]).value);
  }

  async infoGenSel() {
    await this.etapa2Service.obtenerInfoGeneral(this.usuarioActivo.ID).then( (resp: [any]) => {
      console.log('-----------------Obtener datos info general');
      console.log(resp);
      if ( resp[0] ) {
        this.infoGeneralForm.patchValue(resp[0]);
      } else {
        this.infoGeneralForm.patchValue({
          ID: '',
          id_periId: '1',
          id_num_sapId: this.usuarioActivo.ID,
          infg_area_desarrollo: '',
          infg_area_desarrollo_ajuste_comp: '',
          infg_busqueda_desafio: '',
          infg_busqueda_desafio_ajuste_com: '',
        });
      }
    });
  }

  async infoMotivaciones() {
    await this.etapa2Service.obtenerMotivaciones(this.usuarioActivo.ID).then( (resp: [any]) => {
      console.log('-----------------Obtener top 5 Motivaciones');
      console.log(resp);
      let varLocal = 0;
      resp.forEach(element => {
        if (element.mova_valor && varLocal < 5) {

          this.selectMotivaciones.push(element.mova_descripcion);
          varLocal = varLocal + 1;
        }
      });
      console.log(this.selectMotivaciones);
    });
  }


/*
  changeLabelName(lbl, val) {
    document.getElementById(lbl).innerHTML = val;
  }

  botonDisabled() {
    (document.getElementById('boton1') as HTMLInputElement).disabled = true;
    (document.getElementById('boton2') as HTMLInputElement).disabled = true;
  }

  botonEnabled() {
    (document.getElementById('boton1') as HTMLInputElement).disabled = false;
    (document.getElementById('boton2') as HTMLInputElement).disabled = false;
  }
*/
  goToLink(url: string) {
    window.open(url, '_blank');
  }

  goToLinkSelf(url: string) {
    window.open(url, '_self');
  }

  goToLinkSelf2(url: string) {
    window.open(url, '_blank"');
  }

  recibirUsuarioActivo($event) {
    this.usuarioActivo = $event;
    console.log('usuarioActivo desde Padre ' + this.usuarioActivo.ID);
    // A continuación las acciones necesarias a realizar con el dato del usuario
    // Inicializar cargos en blanco
    this.cargoCtrl.setValue('');
    this.cargo2Ctrl.setValue('');
    this.cargo3Ctrl.setValue('');

    this.infoGenSel(); // Cargar info General
    this.infoEspSel(); // Cargar info Especifica
    this.infoMotivaciones();
  }

}
