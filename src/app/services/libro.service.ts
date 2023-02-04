import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { LibroWithAuEd } from '../models/libro.withAE';
import { AddLibro } from '../models/add.libro';

@Injectable({
    providedIn: 'root'
  })
  export class LibroService {

    public urlEndPoint: string = environment.apiUrl + "/api";
    private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    private httpHeadersP = new HttpHeaders({ 'enctype': 'multipart/form-data' });
    private httpHeadersQ = new HttpHeaders({ 'Content-Type': 'multipart/form-data' });

    constructor(private http: HttpClient,private authService: AuthService) {
    }
    
    getAll():Observable<any>{
        return this.http.get(`${this.urlEndPoint}/libro`);
    }

    getOne(id?:string):Observable<LibroWithAuEd>{
      return this.http.get(`${this.urlEndPoint}${id}`);
    }

    save(libro:AddLibro):Observable<any>{

      const formData = new FormData();

      formData.append('nombre',libro.nombre)
      formData.append('portada',libro.portada)
      formData.append('url',libro.url)
      formData.append('autorId',libro.autorId.toString())
      formData.append('editorialId',libro.editorialId.toString())

      formData.forEach(element => {
        console.log(element);
      });

      try {
        return this.http.post(`${this.urlEndPoint}/libro`, formData, {headers:this.authService.agregarAuthorizationHeader(this.httpHeadersP)})
      } catch (error) {
        console.info("Error al crear.");
        return this.http.post(`${this.urlEndPoint}/libro`, formData, {headers:this.authService.agregarAuthorizationHeader(this.httpHeadersQ)})
      }
    }

  }