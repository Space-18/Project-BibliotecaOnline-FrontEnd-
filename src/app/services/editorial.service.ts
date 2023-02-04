import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { catchError, firstValueFrom, map, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import Swal from 'sweetalert2';
import { AddEditorial } from '../models/add.editorial';

@Injectable({
    providedIn: 'root'
  })
  export class EditorialService {
    public urlEndPoint: string = environment.apiUrl + "/api";
    private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

    constructor(private http: HttpClient,private authService: AuthService) {
    }
    
    getAll():Observable<any>{
        return this.http.get(`${this.urlEndPoint}/editorial`);
    }

    save(editorial?:AddEditorial):Observable<AddEditorial>{
      return this.http.post(`${this.urlEndPoint}/editorial`,editorial,{headers:this.authService.agregarAuthorizationHeader(this.httpHeaders)})
    }

    delete(id?:number):Observable<any>{
      return this.http.delete(`${this.urlEndPoint}/editorial/${id}`, {headers:this.authService.agregarAuthorizationHeader(this.httpHeaders)})
      .pipe(
        catchError(e => {
          if (this.authService.isNoAutorizado(e)) {
            return throwError(e);
          }
          Swal.fire({
  
            position: 'center',
            
            title: `${e.error.reason} `,
            icon: 'error',
            text: `${e.error.detalle.mensaje} `,
            showConfirmButton: false,
            timer: 2500
          })
          return throwError(e);
        })
      ); 
    }
  }