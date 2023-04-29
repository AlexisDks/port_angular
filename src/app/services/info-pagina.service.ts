import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InfoPagina } from '../interfaces/info_pagina.interface';
import { Equipo } from '../interfaces/equipo.interface';

@Injectable({
  providedIn: 'root',
})
export class InfoPaginaService {
  info: InfoPagina = {};
  cargada = false;
  equipo: Equipo[] = [];

  constructor(private http: HttpClient) {
    this.cargarInfo();
    this.cargarEquipo();
  }

  private cargarInfo() {
    //Leer el archivo JSON
    this.http
      .get('assets/data/data_pagina.json')
      .subscribe((resp: InfoPagina) => {
        this.cargada = true;
        this.info = resp;
      });
  }

  private cargarEquipo() {
    this.http
      .get<Equipo[]>(
        'https://ng-temhtml-default-rtdb.firebaseio.com/equipo.json'
      )
      .subscribe((resp: Equipo[]) => {
        this.equipo = resp;
      });
  }
}
