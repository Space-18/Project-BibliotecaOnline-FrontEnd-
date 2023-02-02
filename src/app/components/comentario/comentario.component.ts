import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AllComentario } from "src/app/models/all.comentario";
import { AuthService } from "src/app/services/auth.service";
import { ComentarioService } from "src/app/services/comentario.service";

@Component({
    selector: 'app-comentario',
    templateUrl: './comentario.component.html',
    styleUrls: ['./comentario.component.scss']
})

export class ComentarioComponent implements OnInit{
    urlTree: any
    allComentario = Array<AllComentario>();
    isLogged = false;

    constructor(private router:Router, private comentarioService:ComentarioService, private authService:AuthService){
        this.urlTree = this.router.parseUrl(this.router.url);
    }

    ngOnInit(): void {
        if (this.authService.token) {
            this.isLogged = true;
          } else {
            this.isLogged = false;
          }
    }

    getAll(){
        this.comentarioService.getAll(this.urlTree).subscribe(allComentario =>{
            this.allComentario = allComentario;
        })
    }
}