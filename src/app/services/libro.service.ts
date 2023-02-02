import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { LibroWithAuEd } from '../models/libro.withAE';

@Injectable({
    providedIn: 'root'
  })
  export class LibroService {

    public urlEndPoint: string = environment.apiUrl + "/api";
    private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

    constructor(private http: HttpClient,private authService: AuthService) {
    }
    
    getAll():Observable<any>{
        return this.http.get(`${this.urlEndPoint}/libro`);
    }

    getOne(id?:string):Observable<LibroWithAuEd>{
      return this.http.get(`${this.urlEndPoint}${id}`);
    }

  }