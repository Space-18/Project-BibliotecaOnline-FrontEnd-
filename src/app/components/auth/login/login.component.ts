import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { UserCredentials } from 'src/app/models/user.credentials';
import { AuthService } from 'src/app/services/auth.service';

import swal from 'sweetalert2';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
  })
  export class LoginComponent implements OnInit, OnDestroy {
    public user: UserCredentials;
    public showLoading: boolean = false;
    private subscriptions: Subscription[] = [];

    constructor(
        private router: Router,
        private authService: AuthService,
        ) {
        this.user = new UserCredentials()
      }

    ngOnInit(): void {
      this.authService.hasPermission();
      if (this.authService.isAuthenticated() || this.authService.isLoged()) {
        this.router.navigateByUrl('/home');
      }  else {
        this.router.navigateByUrl('/login');
      }
      }

      async onLogin() {
        if (this.user.email == null || this.user.password == null) {
          swal.fire('Error Login', 'Username o password vacías!', 'error');
          return;
        }
        this.showLoading = true;
        await this.authService.login(this.user).subscribe(
          async response => {
            let objPayload = JSON.parse(atob(response.token.split(".")[1]));
            this.authService.guardarToken(response.token);
            
            this.authService.guardarUsuario(this.user);
    
            swal.fire('Login', `Hola ${this.user.email}, has iniciado sesión con éxito!`, 'success');
            this.showLoading = false;
            this.router.navigateByUrl('/home');
          },
          err => {
              if(err.status==400){
                console.log(err)
                swal.fire('Login',"Ingrese credenciales válidas.", 'error');
                this.showLoading = false;
              }
          })
    }
  
    ngOnDestroy(): void {
      this.subscriptions.forEach(sub => sub.unsubscribe());
    }
  }