import { Component, OnInit } from "@angular/core";
import { AllEditorial } from "src/app/models/all.editorial";
import { EditorialService } from "src/app/services/editorial.service";

@Component({
    selector: 'app-home',
    templateUrl: './editorial.component.html',
    styleUrls: ['./editorial.component.scss']
})

export class EditorialComponent implements OnInit{

    allEditorial=Array<AllEditorial>();

    constructor(private readonly editorialService:EditorialService){}

    ngOnInit(): void {
        this.getAll();
    }

    getAll(){
        this.editorialService.getAll().subscribe(allEditorial =>{ this.allEditorial = allEditorial })
    }
}