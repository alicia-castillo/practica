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
  ModificaUsuarioForm = this.ModificaUsuario.group({
    usuario : ['', Validators.required],
    nombre : [''],
    edad : ['', Validators.required],
    correos : ['', Validators.required],
    id: ['', Validators.required]
  });


  ngOnInit(): void {
    this.crudservice.get_usuarios().subscribe(data => {

      this.usuarios = data.map(u => {
        return {
          id: u.payload.doc.id,
          isedit: false,
          usuario: u.payload.doc.data()['usuario'],
          nombre: u.payload.doc.data()['nombre'],
          edad: u.payload.doc.data()['edad'],
          correos: u.payload.doc.data()['correos']
        };
      })
      console.log(this.usuarios);

    });
  }

  modifica_usuario(user){
    console.log("hii" + user.id);
    let usuario = {};
    this.ModificaUsuarioForm.patchValue({
      usuario : user.usuario,
      nombre : user.nombre,
      edad: user.edad,
      correos: user.correos,
      id: user.id
    });  
  }

  actualiza_usuario(){
    console.log('hiiiiiii' + this.ModificaUsuarioForm.controls['id'].value);
    let usuario = {};
    usuario['usuario'] = this.ModificaUsuarioForm.controls['usuario'].value;
    usuario['nombre'] = this.ModificaUsuarioForm.controls['nombre'].value;
    usuario['edad'] = this.ModificaUsuarioForm.controls['edad'].value;
    usuario['correos'] = this.ModificaUsuarioForm.controls['correos'].value;
    usuario['id'] = this.ModificaUsuarioForm.controls['id'].value;
    this.crudservice.actualiza_usuario(usuario);
    console.warn(usuario);
  }

  eliminar_usuario(id : number){
    this.crudservice.elimina_usuario(id);
  }

}
