import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AddEditorial } from "src/app/models/add.editorial";
import { AuthService } from "src/app/services/auth.service";
import { EditorialService } from "src/app/services/editorial.service";
import Swal from "sweetalert2";

@Component({
    selector: 'app-addEditorial',
    templateUrl: './addEditorial.component.html',
    styleUrls: ['./addEditorial.component.scss']
})
export class AddEditorialComponent implements OnInit{

    hasper = false;
    editorial : AddEditorial ={
        nombre: '',
        direccion:'',
        telefono:0
    }

    submitted = false;

    public formsRegistra = new FormGroup({
        Registrar: new FormGroup({
            validaNombre: new FormControl('', [Validators.required, Validators.pattern('^(?!.* $)[A-Z][A-z ]+$')]),
            validaDireccion: new FormControl('', [Validators.required, Validators.pattern('(?<s>^[\\D]+[ ])(?<h>[\\d]+)(?<e>.*?$)|')]),
            validaTelefono: new FormControl('', [Validators.required,Validators.pattern('^[1-9][0-9]{4,8}$')])
        })
    });

    constructor(private readonly editorialService:EditorialService, private authService:AuthService,private router:Router){}

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

          console.info(this.editorial.nombre + " --- "+ this.editorial.direccion + " --- " + this.editorial.telefono)

          this.editorialService.save(this.editorial).subscribe(sa=>{
            Swal.fire('Éxito','Autor '+ sa.nombre +' agregado correctamente','success');
            sa = new AddEditorial();
        })
    }

}