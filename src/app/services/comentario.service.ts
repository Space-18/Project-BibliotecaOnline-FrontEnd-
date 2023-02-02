import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
  })
  export class ComentarioService {
    constructor(private http:HttpClient,private router: Router){}

    public urlEndPoint: string = environment.apiUrl+'/api';

    getAll(id?:string):Observable<any>{
        return this.http.get(`${this.urlEndPoint}${id}/comentarios`);
    }
  }