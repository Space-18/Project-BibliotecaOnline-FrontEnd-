import { Component, OnInit } from "@angular/core";
import { AllAutor } from "src/app/models/all.autor";
import { AutorService } from "src/app/services/autor.service";

@Component({
    selector: 'app-home',
    templateUrl: './autor.component.html',
    styleUrls: ['./autor.component.scss']
})

export class AutorComponent implements OnInit{

    allAutor = Array<AllAutor>();

    constructor(private readonly autorService:AutorService) { }

    ngOnInit(): void {
        this.getAll();
    }

    getAll(){
        this.autorService.getAll().subscribe(allAutor =>{ this.allAutor = allAutor })
    }

}