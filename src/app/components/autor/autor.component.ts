import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AllAutor } from "src/app/models/all.autor";
import { AuthService } from "src/app/services/auth.service";
import { AutorService } from "src/app/services/autor.service";
import Swal from "sweetalert2";

@Component({
    selector: 'app-autor',
    templateUrl: './autor.component.html',
    styleUrls: ['./autor.component.scss']
})

export class AutorComponent implements OnInit{

    allAutor = Array<AllAutor>();
    hasper = false;

    constructor(private readonly autorService:AutorService, private authService:AuthService, private router:Router) { }

    ngOnInit(): void {
        if(this.authService.hasPermission()){
            this.hasper = true;         
        }
        else{
            this.hasper = false;
        }
        this.getAll();
    }

    getAll(){
        this.autorService.getAll().subscribe(allAutor =>{ this.allAutor = allAutor })
    }

    agregar(){
        this.router.navigateByUrl('/autor/add');
    }

    delet(id?:number){
        Swal.fire({
            title: '¿Desea eliminar?',
            text: "Los cambios no se van a revertir",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar.',
            cancelButtonText: 'No, cancelar'
          }).then((result) => {
        if (result.isConfirmed) {
              this.autorService.delete(id).subscribe(
                x => {
                    Swal.fire('Mensaje',"Eliminado",'success');
                    this.getAll();
                }
              )
            }
        });
    }

}