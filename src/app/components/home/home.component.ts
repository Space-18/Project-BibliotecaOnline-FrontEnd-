import { Component, OnInit } from "@angular/core";
import { AllLibro } from "src/app/models/all.libro";
import { Router } from '@angular/router';
import { LibroService } from "src/app/services/libro.service";
import { AuthService } from "src/app/services/auth.service";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

    hasper = false;
    allLibro = new Array<AllLibro>();
    fileURL = ""; 

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

    viewPDF(allLibro: any){

        const blobTest = new Blob([allLibro], { type: 'application/pdf' });
        const fileURL = URL.createObjectURL(blobTest);
        console.info(fileURL);
        this.fileURL = fileURL;
    }

    getOne(id?:number){
        this.router.navigateByUrl('/libro/'+id);
    }
}