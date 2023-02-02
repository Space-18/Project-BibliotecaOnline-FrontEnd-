import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserCredentials } from '../models/user.credentials';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { TokenDec } from '../models/token';

@Injectable({
    providedIn: 'root'
  })
  export class AuthService {

    constructor(private http: HttpClient,private router: Router, /*private jwtService:JwtHelperService*/) {
        
    }

    public urlEndPoint: string = environment.apiUrl;
    private _userCredential?: UserCredentials | any | undefined;
    private _token?: string | any | undefined;
    private objToken?: string | any | undefined;

    public get user(): UserCredentials{
        if(this._userCredential != null){
            return this._userCredential;
        } else if(this._userCredential == null && sessionStorage.getItem('user') != null){
            this._userCredential = sessionStorage.getItem('user') as UserCredentials;
            return this._userCredential;
        }

        return new UserCredentials();
    }

    public get token(): string | null{
        if (this._token != null) {
            return this._token;
          } else if (this._token == null && sessionStorage.getItem('token') != null) {
            this._token = sessionStorage.getItem('token');
            return this._token;
          }
          return null;
    }

    public login(user:UserCredentials): Observable<any>{
        return this.http.post<any>(`${this.urlEndPoint}/api/auth/login`, user);
    }

    logOut(): void {
        this._token = null;
        this._userCredential = null;
        sessionStorage.clear();
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('usuario');
    }

    public register(user:UserCredentials):  Observable<HttpResponse<any> | HttpErrorResponse>{
        return this.http.post<HttpResponse<any> | HttpErrorResponse>(`${this.urlEndPoint}/api/auth/register`,user);
    }

    guardarToken(accessToken: string): void {
        this._token = accessToken;
        sessionStorage.setItem('token', accessToken);
    }

    guardarUsuario(user: UserCredentials): void {
        this._userCredential = user
        this._userCredential.password = "*******************"
        sessionStorage.setItem('user', JSON.stringify(this._userCredential));
    }

    obtenerDatosToken(accessToken: any): any {
        if (accessToken != null) {
          return JSON.parse(atob(accessToken.split(".")[1]));
        }
        return null;
    }

    public hasPermission():boolean{
      try {
        if(sessionStorage.getItem('token') != null || sessionStorage.getItem('token') != undefined){
          var tokenSession = sessionStorage.getItem('token');
          //var tokdecoss = this.jwtService.decodeToken(toeknSession);
          var tokdecos = this.obtenerDatosToken(tokenSession)

          if(tokdecos.admin == "si"){
            return true;
          } else{
            return false;
          }
        }
      } catch (error) {
        console.info(error);
        return false;
      }
      return false;
    }

    public isLoged():boolean{
      this.objToken = sessionStorage.getItem('token');
      if(this.objToken == null){
        return false;
      }
      return true;
    }

    isAuthenticated(): boolean{
        let payload = this.obtenerDatosToken(this._token);
        if (payload != null && payload.iss && payload.iss.length > 0) {
          return true;
        }
        return false;
    }

    public agregarAuthorizationHeader(cabecera:HttpHeaders) {
        let token = this.token;
        if (token != null) {
          return cabecera.append('Authorization', 'Bearer ' + token);
        }
        return cabecera;
    }

    public isNoAutorizado(e: { status: number; }): boolean {
    
        if (e.status == 401) {
          if (this.isAuthenticated()) {
            this.logOut();
          }
          this.router.navigate(['/login']);
          return true;
        }
    
        if (e.status == 403) {
          swal.fire('Acceso denegado', `El usuario ${this.user.email} no tienes acceso a este recurso!`, 'warning');
          this.router.navigate(['/login']);
          return true;
        }
        return false;
      }
  }