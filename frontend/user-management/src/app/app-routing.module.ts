import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarisComponent } from './usuaris/usuaris.component';
import { NouUsuariComponent } from './nou-usuari/nou-usuari.component';
import { PerfilComponent } from './perfil/perfil.component';

const routes: Routes = [
  { path: '', redirectTo: '/usuaris', pathMatch: 'full' },  // Redirigeix per defecte a /usuaris
  { path: 'usuaris', component: UsuarisComponent },
  { path: 'nou-usuari', component: NouUsuariComponent },
  { path: 'perfil/:id', component: PerfilComponent },   // :id serà el DNI de l'usuari
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
