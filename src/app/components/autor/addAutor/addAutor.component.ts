import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AddAutor } from "src/app/models/add.autor";
import { AuthService } from "src/app/services/auth.service";
import { AutorService } from "src/app/services/autor.service";
import Swal from "sweetalert2";

@Component({
    selector: 'app-addAutor',
    templateUrl: './addAutor.component.html',
    styleUrls: ['./addAutor.component.scss']
})

export class AddAutorComponent implements OnInit{

    hasper = false;
    autor : AddAutor ={
        nombres: '',
        apellidos: '',
        edad: 0,
        nacionalidad: ''
    }

    submitted = false;

    public formsRegistra = new FormGroup({
        Registrar: new FormGroup({
            validaNombre: new FormControl('', [Validators.required, Validators.pattern('^(?!.* $)[A-Z][A-z ]+$')]),
            validaApellido: new FormControl('', [Validators.required, Validators.pattern('^(?!.* $)[A-Z][A-z ]+$')]),
            validaEdad: new FormControl('', [Validators.required,Validators.pattern('^[1-9][0-9]{0,1}$')]),
            validaNacionalidad: new FormControl('', [Validators.required, Validators.pattern('^(?!.* $)[A-Z][A-z ]+$')])
        })
    });
    

    constructor(private readonly autorService:AutorService,private authService:AuthService, private router:Router){}

    ngOnInit(): void {
        if(this.authService.hasPermission()){
            this.hasper = true;         
        }
        else{
            this.hasper = false;
            //Swal.fire('Error','Error de Página','error');
            this.router.navigateByUrl('/error')
        }
    }

    save(){

        this.submitted = true;

        if (this.formsRegistra.invalid){
            return;
            }
          this.submitted = false;

        console.info(this.autor.nombres + " --- "+ this.autor.apellidos + " --- " + this.autor.edad + " --- " + this.autor.nacionalidad)
        this.autorService.save(this.autor).subscribe(sa=>{
            Swal.fire('Éxito','Autor '+ sa.nombres +' agregado correctamente','success');
            sa = new AddAutor();
        })
    }

}