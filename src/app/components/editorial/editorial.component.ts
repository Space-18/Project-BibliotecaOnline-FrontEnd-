import { Component, OnInit } from "@angular/core";
import { AllEditorial } from "src/app/models/all.editorial";
import { AuthService } from "src/app/services/auth.service";
import { EditorialService } from "src/app/services/editorial.service";

@Component({
    selector: 'app-editorial',
    templateUrl: './editorial.component.html',
    styleUrls: ['./editorial.component.scss']
})

export class EditorialComponent implements OnInit{

    allEditorial=Array<AllEditorial>();
    hasper = false;

    constructor(private readonly editorialService:EditorialService, private authService:AuthService){}

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
}