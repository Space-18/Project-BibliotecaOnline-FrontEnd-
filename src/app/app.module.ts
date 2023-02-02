import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthService } from './services/auth.service';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing,module';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './components/auth/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './components/auth/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './menu/menu.component';
import { GuardadoComponent } from './components/guardados/guardado.component';
import { AutorComponent } from './components/autor/autor.component';
import { EditorialComponent } from './components/editorial/editorial.component';
import { LibroWithComponent } from './components/libro/libroWith/librowith.component';
import { ComentarioComponent } from './components/comentario/comentario.component';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { AddAutorComponent } from './components/autor/addAutor/addAutor.component';
import { ErrorComponent } from './components/error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    MenuComponent,
    GuardadoComponent,
    AutorComponent,
    EditorialComponent,
    LibroWithComponent,
    ComentarioComponent,
    AddAutorComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [ AuthGuard, AuthService, 
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    /*{provide: JWT_OPTIONS, useValue: JWT_OPTIONS},JwtHelperService*/],
  bootstrap: [AppComponent]
})
export class AppModule { }
