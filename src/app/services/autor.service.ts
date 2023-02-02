import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { AddAutor } from '../models/add.autor';

@Injectable({
    providedIn: 'root'
  })
  export class AutorService {
    public urlEndPoint: string = environment.apiUrl + "/api";
    private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

    constructor(private http: HttpClient,private authService: AuthService) {
    }
    
    getAll():Observable<any>{
        return this.http.get(`${this.urlEndPoint}/autor`);
    }

    getOne(id?:string):Observable<any>{
      return this.http.get(`${this.urlEndPoint}${id}`);
    }

    save(autor?:AddAutor):Observable<AddAutor>{
      return this.http.post(`${this.urlEndPoint}/autor`,autor, { headers: this.authService.agregarAuthorizationHeader(this.httpHeaders) });
    }
  }