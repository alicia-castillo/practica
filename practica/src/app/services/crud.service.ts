import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(public fireservices:AngularFirestore) { }

  crea_usuario(usuario : any){
    //alert('hi');
    return this.fireservices.collection('usuarios').add(usuario);
    //return true;
  }

  get_usuarios(){
    return this.fireservices.collection('usuarios').snapshotChanges();
  }

  actualiza_usuario(usuario : any){
    this.fireservices.doc('usuarios/' + usuario.id).update(usuario);
  }

  elimina_usuario(id : number){
    this.fireservices.doc('usuarios/' + id).delete();
  }
}
