import { Component } from '@angular/core';
import { UsuarisService } from '../usuaris.service';
import { Router } from '@angular/router';

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

  constructor(private usuarisService: UsuarisService, private router: Router) {}

  afegirUsuari() {
    this.usuarisService.afegirUsuari(this.nouUsuari).subscribe(
      (response) => {
        console.log('Usuari afegit!', response);
        this.router.navigate(['/usuaris']);
      },
      (error) => {
        console.error('Error afegint l\'usuari', error);
      }
    );
  }
}
