import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(public fireservices:AngularFirestore) { }

  crea_usuario(usuario : any){ //funcion para agregar usuario a firebase
    return this.fireservices.collection('usuarios').add(usuario);
  }

  get_usuarios(){ //funcion para obtener la coleccion de datos de firebase
    return this.fireservices.collection('usuarios').snapshotChanges();
  }

  actualiza_usuario(usuario : any){ //funcion para actualizar un usuario en firebase
    this.fireservices.doc('usuarios/' + usuario.id).update(usuario);
  }

  elimina_usuario(id : number){ //funcion para eliminar dato de firebase
    this.fireservices.doc('usuarios/' + id).delete();
  }
}
