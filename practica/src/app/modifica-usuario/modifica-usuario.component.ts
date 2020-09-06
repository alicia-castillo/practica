import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-modifica-usuario',
  templateUrl: './modifica-usuario.component.html',
  styleUrls: ['./modifica-usuario.component.css']
})
export class ModificaUsuarioComponent implements OnInit {

  constructor(private ModificaUsuario : FormBuilder, public crudservice : CrudService) { }
  usuarios : any;
  //Crea reactive form para la modificación
  ModificaUsuarioForm = this.ModificaUsuario.group({
    usuario : ['', Validators.required],
    nombre : [''],
    edad : ['', Validators.required],
    correos : ['', Validators.required],
    id: ['', Validators.required]
  });


  ngOnInit(): void {
    //Se obtienen los datos de la coleccion usuarios de firebase llamando get_usuarios() encontrada en el crud.service
    this.crudservice.get_usuarios().subscribe(data => {
      //Se asigna a nuestro dato usuarios previamente declarado el resultado de nuestra llamada al service
      this.usuarios = data.map(u => {
        return {
          id: u.payload.doc.id,
          usuario: u.payload.doc.data()['usuario'],
          nombre: u.payload.doc.data()['nombre'],
          edad: u.payload.doc.data()['edad'],
          correos: u.payload.doc.data()['correos']
        };
      })

    });
  }

  modifica_usuario(user){ //funcion para llenar el form del modal de editar
    this.ModificaUsuarioForm.patchValue({
      usuario : user.usuario,
      nombre : user.nombre,
      edad: user.edad,
      correos: user.correos,
      id: user.id
    });  
  }

  actualiza_usuario(){ //funcion llamada para actualizar el usuario 
    let usuario = {};
    usuario['usuario'] = this.ModificaUsuarioForm.controls['usuario'].value;
    usuario['nombre'] = this.ModificaUsuarioForm.controls['nombre'].value;
    usuario['edad'] = this.ModificaUsuarioForm.controls['edad'].value;
    let correosarray = (this.ModificaUsuarioForm.controls['correos'].value + '').split(',');
    usuario['correos'] = correosarray;
    usuario['id'] = this.ModificaUsuarioForm.controls['id'].value;
    this.crudservice.actualiza_usuario(usuario);
  }

  eliminar_usuario(id : number){ //funcion para la eliminacion del usuario
    this.crudservice.elimina_usuario(id);
  }

}
