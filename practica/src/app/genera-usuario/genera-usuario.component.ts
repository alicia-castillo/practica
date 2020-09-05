import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-genera-usuario',
  templateUrl: './genera-usuario.component.html',
  styleUrls: ['./genera-usuario.component.css']
})
export class GeneraUsuarioComponent implements OnInit {
 
  constructor(private Altausuarios : FormBuilder, public crudservice : CrudService) {  }

  AltaUsuariosForm = this.Altausuarios.group({
    usuario : ['', Validators.required],
    nombre : [''],
    edad : ['', Validators.required],
    correos : this.Altausuarios.array([
        this.Altausuarios.control('', [Validators.required, Validators.email])
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
    this.crudservice.crea_usuario(usuario).then(res =>{
      
      console.log("el usuario es: " + usuario);
     // this.AltaUsuariosForm.controls['usuario'].value = ""; @
    }).catch(error => console.log("There's been an error")
    );
    this.AltaUsuariosForm.reset(); //Limpia el form
    (<FormArray>this.AltaUsuariosForm.get('correos')).clear(); //Limpia el arreglo de correos
    this.correos.push(this.Altausuarios.control('')); //Agrega el principal
  }
   
  EliminaCorreo(index : number){ //Funciòn para eliminar el input de correo si ya no se necesita
    (<FormArray>this.AltaUsuariosForm.get('correos')).removeAt(index);
  }
  
  ngOnInit(): void {
  }

}
