import { Component, OnInit, OnDestroy, NgModule } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserCredentials } from 'src/app/models/user.credentials';

import Swal from 'sweetalert2';
import { LoginComponent } from '../login/login.component';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
  })
  export class RegisterComponent implements OnInit, OnDestroy{
    public user: UserCredentials;
    public showLoading: boolean = false;
    private subscriptions: Subscription[] = [];
    public titulo: String = `Regitro`
    public errores: any
    public loginc:LoginComponent | undefined

    constructor(
        private router: Router,
        private authService: AuthService
    ){ this.user= new UserCredentials}

    ngOnInit(): void {
        if (this.authService.isAuthenticated()) {
            this.router.navigateByUrl('/home');
          } else{
            this.router.navigateByUrl('/register');
          }
    }

    async onRegister(){
      this.showLoading = true
      console.log("usuario",this.user);
      
  
      this.authService.register(this.user)
        .subscribe(response => {
          console.log("response!")
          Swal.fire('Éxito','Registrado', 'success')
          console.log("Registro exitoso",response);
          this.router.navigateByUrl('/login');
        },
        (err:any) => {
            this.errores = err.message;
            console.log(err);
            Swal.fire('Error','Ingrese Datos válidos', 'error')
        }
        )
    }


























    ngOnDestroy(): void {
      this.subscriptions.forEach(sub => sub.unsubscribe());
    }
  }