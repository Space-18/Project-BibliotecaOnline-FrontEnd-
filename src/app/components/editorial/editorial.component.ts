import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { count } from "rxjs";
import { AllEditorial } from "src/app/models/all.editorial";
import { AuthService } from "src/app/services/auth.service";
import { EditorialService } from "src/app/services/editorial.service";
import Swal from "sweetalert2";

@Component({
    selector: 'app-editorial',
    templateUrl: './editorial.component.html',
    styleUrls: ['./editorial.component.scss']
})

export class EditorialComponent implements OnInit{

    allEditorial=Array<AllEditorial>();
    hasper = false;

    constructor(private readonly editorialService:EditorialService, private authService:AuthService, private router:Router){}

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
        this.editorialService.getAll().subscribe(allEditorial =>{ this.allEditorial = allEditorial })
    }

    agregar(){
        this.router.navigateByUrl('/editorial/add');
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
              this.editorialService.delete(id).subscribe(
                x => {
                    Swal.fire('Mensaje',"Eliminado",'success');
                    this.getAll();
                }
              )
            }
        });
    }
}