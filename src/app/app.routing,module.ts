import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuardadoComponent } from './components/guardados/guardado.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { AutorComponent } from './components/autor/autor.component';
import { EditorialComponent } from './components/editorial/editorial.component';
import { LibroWithComponent } from './components/libro/libroWith/librowith.component';
import { AddAutorComponent } from './components/autor/addAutor/addAutor.component';
import Swal from 'sweetalert2';
import { ErrorComponent } from './components/error/error.component';
import { AddEditorialComponent } from './components/editorial/addEditorial/addEditorial.component';
import { AddLibroComponent } from './components/libro/addLibro/addLibro.component';

const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'home',component:HomeComponent},
  {path:'guardados',component:GuardadoComponent},
  {path:'autores',component:AutorComponent},
  {path:'editoriales',component:EditorialComponent},
  {path:'libro/:id',component:LibroWithComponent},
  {path:'autor/add',component:AddAutorComponent},
  {path:'editorial/add',component:AddEditorialComponent},
  {path:'libros/add',component:AddLibroComponent},
  {path:'error',component:ErrorComponent},
    {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'home',loadChildren:() => import('./components/home/home.component').then(m=>m.HomeComponent)},
    {path: 'register',loadChildren:() => import('./components/auth/register/register.component').then(m=>m.RegisterComponent)},
    { path: '**', redirectTo: 'error'},
  ];

  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
  