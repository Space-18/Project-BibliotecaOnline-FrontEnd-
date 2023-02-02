import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AllAutor } from "src/app/models/all.autor";
import { AuthService } from "src/app/services/auth.service";
import { AutorService } from "src/app/services/autor.service";

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

}