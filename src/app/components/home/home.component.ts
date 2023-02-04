import { Component, OnInit } from "@angular/core";
import { AllLibro } from "src/app/models/all.libro";
import { Router } from '@angular/router';
import { LibroService } from "src/app/services/libro.service";
import { AuthService } from "src/app/services/auth.service";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

    hasper = false;
    allLibro = new Array<AllLibro>();

    constructor(private readonly libroService:LibroService,private router: Router, private readonly authService:AuthService) { }

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
        this.libroService.getAll().subscribe(allLibro => {
            this.allLibro =allLibro;
        });
    }

    getOne(id?:number){
        this.router.navigateByUrl('/libro/'+id);
    }

    agregar(){
        this.router.navigateByUrl('/libros/add');
    }
}