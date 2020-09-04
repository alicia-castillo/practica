import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-genera-usuario',
  templateUrl: './genera-usuario.component.html',
  styleUrls: ['./genera-usuario.component.css']
})
export class GeneraUsuarioComponent implements OnInit {
 
  constructor(private Altausuarios : FormBuilder, crudservice : CrudService) {  }

  AltaUsuariosForm = this.Altausuarios.group({
    usuario : ['', Validators.required],
    nombre : [''],
    edad : [''],
    correos : this.Altausuarios.array([
        this.Altausuarios.control('')
    ])
  });

  get correos(){
    return this.AltaUsuariosForm.get('correos') as FormArray;
  }

  agregaCorreo(){
    this.correos.push(this.Altausuarios.control(''));
}

  onSubmit() {
    // TODO: Use EventEmitter with form value
    let usuario = {};
    usuario['usuario'] = this.AltaUsuariosForm.controls['usuario'].value;
    usuario['nombre'] = this.AltaUsuariosForm.controls['nombre'].value;
    usuario['edad'] = this.AltaUsuariosForm.controls['edad'].value;
    usuario['correos'] = this.AltaUsuariosForm.get('correos').value;
    console.warn(usuario);
  }
   
  
  
  ngOnInit(): void {
  }

}
