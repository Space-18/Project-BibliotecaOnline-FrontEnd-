import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AddLibro } from "src/app/models/add.libro";
import { AllAutor } from "src/app/models/all.autor";
import { AllEditorial } from "src/app/models/all.editorial";
import { AuthService } from "src/app/services/auth.service";
import { AutorService } from "src/app/services/autor.service";
import { EditorialService } from "src/app/services/editorial.service";
import { LibroService } from "src/app/services/libro.service";
import Swal from "sweetalert2";

@Component({
    selector:'app-addLibro',
    templateUrl:'./addLibro.component.html',
    styleUrls:['./addLibro.component.scss']
})
export class AddLibroComponent implements OnInit{

    hasper = false;

    autores = Array<AllAutor>();
    editoriales = Array<AllEditorial>();
    libro = new AddLibro();

    portada!:File;
    url!:File;

    load=false;

    submitted = false;

    public formsRegistra = new FormGroup({
        Registrar: new FormGroup({
            validaNombre: new FormControl('',[Validators.required]),
            validaPortada: new FormControl('',[Validators.required]),
            validaUrl: new FormControl('',[Validators.required]),
            validaAutorId: new FormControl('',[Validators.required]),
            validaEditorialId: new FormControl('',[Validators.required])
        })
    });

    constructor(private readonly libroService:LibroService,private editorialService:EditorialService,private autorService:AutorService,private router:Router, private authService:AuthService){}

    ngOnInit(): void {
        if(this.authService.hasPermission()){
            this.hasper = true;     
            this.getAutores();
            this.getEditoriales();    
        }
        else{
            this.hasper = false;
            //Swal.fire('Error','Error de Página','error');
            this.router.navigateByUrl('/error')
        }
    }

    getAutores(){
        this.autorService.getAll().subscribe( autores => {
            this.autores = autores;
        })
    }

    getEditoriales(){
        this.editorialService.getAll().subscribe(editoriales=>{
            this.editoriales = editoriales;
        })
    }

    addPortada(portada:any){
        this.portada = portada.target.files[0];
        console.log(this.portada);
        if (this.portada.type.indexOf('image') < 0) {
        Swal.fire('Error seleccionar imagen: ', 'El archivo debe ser del tipo imagen', 'error');
        }else{
            const reader = new FileReader();
            reader.readAsDataURL(this.portada)
        }
    }

    addUrl(url:any){
        this.url = url.target.files[0];
        console.log(this.url);
        if (this.url.type.indexOf('application/pdf') < 0) {
        Swal.fire('Error seleccionar imagen: ', 'El archivo debe ser del tipo pdf', 'error');
        }else{
            const reader = new FileReader();
            reader.readAsDataURL(this.url)
        }
    }

    save(){
        this.submitted = true;

        if (this.formsRegistra.invalid){
            return;
            }
          this.submitted = false;

          console.info(this.libro.nombre + " --- "+ this.libro.portada + " --- " + this.libro.url + " --- " + this.libro.autorId + " --- " + this.libro.editorialId)

          this.load = true;

          console.log("----------------------------"+this.portada);
          console.log("***************************"+this.url)

        this.libroService.save(this.libro).subscribe(libro =>{
            Swal.fire('Éxito','Libro '+ libro.nombre +' agregado correctamente','success');
            libro = new AddLibro();
          },err =>{
            Swal.fire('Error','Error al crearel libro','error');
            this.load = false;
          })
    }
}