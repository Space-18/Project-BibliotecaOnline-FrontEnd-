import { Component, OnInit } from "@angular/core";
import { AllGuardado } from "src/app/models/all.guardado";
import { GuardadoService } from "src/app/services/guardado.service";
import Swal from "sweetalert2";

@Component({
    selector: 'app-guardado',
    templateUrl: './guardado.component.html',
    styleUrls: ['./guardado.component.scss']
})
export class GuardadoComponent implements OnInit{

    allGuardado = new Array<AllGuardado>();

    constructor(private readonly guardadoService:GuardadoService){}

    ngOnInit(): void {
        this.getAll();
    }

    getAll(){
        this.guardadoService.getAll().subscribe(allGuardado=>{this.allGuardado = allGuardado});
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
              this.guardadoService.delete(id).subscribe(
                x => {
                    Swal.fire('Mensaje',"Eliminado",'success');
                    this.getAll();
                }
              )
            }
        });
        
    }
}
