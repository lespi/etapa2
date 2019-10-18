import { Injectable } from '@angular/core';
import { Web, ItemAddResult } from '@pnp/sp';

const web = new Web('https://o365saven.sharepoint.com/sites/mpdc/app');

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }


  async getSPDataUsuario() {
    return await web.currentUser
      .select('Email', 'Title', 'Id')
      .get<{ Title: string }[]>().then((items: any[]) => {
        // console.log(items);
        //  console.log(items['Email']);
        const perLogin = items['Email'].split('@')[0];
        return this.obtenerUsuarioActivo(perLogin);
      });

  }

  async obtenerUsuarioActivo(per_login: string) {
    return await web.lists.getByTitle('persona')
      .items.filter(`per_login eq '${per_login}'`)
      .get<{ Title: string }[]>();

  }

  async obtenerUsuarioActivoRol(per_login: string) {
    return await web.lists.getByTitle('rol')
      .items
      .filter(`per_login_txt eq '${per_login}'`)
      .get<{ Title: string }[]>();

  }

  async obtenerUsuarios() {
    return await web.lists.getByTitle('persona')
                          .items
                          .get<{Title: string}[]>();
  }

  async obtenerPeriodos() {
    return await web.lists.getByTitle('periodo')
                          .items
                          .get<{Title: string}[]>();
  }

}
