import { Component, OnInit } from "@angular/core";
import { AllLibro } from "src/app/models/all.libro";
import { LibroWithAuEd } from "src/app/models/libro.withAE.component";
import { LibroService } from "src/app/services/libro.service";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

    allLibro = new Array<AllLibro>();

    constructor(private readonly libroService:LibroService) { }

    ngOnInit(): void {
        this.getAll();
    }

    getAll(){
        this.libroService.getAll().subscribe(allLibro => {this.allLibro =allLibro});
    }
}