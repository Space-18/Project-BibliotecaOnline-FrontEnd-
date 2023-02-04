import { Component, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { LibroWithAuEd } from "src/app/models/libro.withAE";
import { AuthService } from "src/app/services/auth.service";
import { LibroService } from "src/app/services/libro.service";
import Swal from "sweetalert2";

@Component({
    selector: 'app-librowith',
    templateUrl: './librowith.component.html',
    styleUrls: ['./librowith.component.scss']
})
export class LibroWithComponent implements OnInit{
    public libroWith = new LibroWithAuEd();
    private urlTree: any;
    fileURL:any;
    hasper = false;

    constructor(private readonly libroService:LibroService, private router:Router, private authService:AuthService, private sanitizer:DomSanitizer){
        this.urlTree = this.router.parseUrl(this.router.url);
    }

    ngOnInit(): void {
        if(this.authService.hasPermission()){
            this.hasper = true;         
        }
        else{
            this.hasper = false;
        }
        this.getOne()
    }

    getOne(){
        try {
            this.libroService.getOne(this.urlTree).subscribe(libroWith => {
                if(libroWith != null || libroWith != undefined ){
                    this.libroWith = libroWith
                }
                else{
                    Swal.fire('Error','Libro no existente','error');
                    this.router.navigateByUrl('/home');
                }
            });
        } catch (error) {
            Swal.fire('Error','Libro no existente','error');
            this.router.navigateByUrl('/home');
        }
    }

    viewPDF(allLibro: any){
        this.fileURL = this.sanitizer.bypassSecurityTrustResourceUrl(allLibro);
    }
}