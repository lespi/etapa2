import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Etapa2Service } from './services/etapa2.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class FormularioWebPartComponent implements OnInit {
  @Input() description: string;

 
  constructor( private etapa2Service: Etapa2Service ) { }

  ngOnInit() {

  }

}
