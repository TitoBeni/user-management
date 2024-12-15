import { Component } from '@angular/core';
import { UsuarisService } from '../usuaris.service'; // Importa el servei

@Component({
  selector: 'app-nou-usuari',
  templateUrl: './nou-usuari.component.html',
  styleUrls: ['./nou-usuari.component.scss'],
})
export class NouUsuariComponent {
  nouUsuari = {
    nom: '',
    cognoms: '',
    email: '',
    dni: '',
  };

  constructor(private usuarisService: UsuarisService) {}

  afegirUsuari() {
    // Cridem el servei per afegir l'usuari a la base de dades
    this.usuarisService.afegirUsuari(this.nouUsuari).subscribe(
      (response) => {
        console.log('Usuari afegit!', response);
      },
      (error) => {
        console.error('Error afegint l\'usuari', error);
      }
    );
  }
}
