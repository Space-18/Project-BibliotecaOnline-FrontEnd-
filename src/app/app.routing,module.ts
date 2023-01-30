import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuardadoComponent } from './components/guardados/guardado.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { AutorComponent } from './components/autor/autor.component';
import { EditorialComponent } from './components/editorial/editorial.component';

const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'home',component:HomeComponent},
  {path:'guardados',component:GuardadoComponent},
  {path:'autores',component:AutorComponent},
  {path:'editoriales',component:EditorialComponent},
    {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'home',loadChildren:() => import('./components/home/home.component').then(m=>m.HomeComponent)},
    {path: 'register',loadChildren:() => import('./components/auth/register/register.component').then(m=>m.RegisterComponent)},
    { path: '**', redirectTo: 'home' },
  ];

  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
  