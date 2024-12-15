import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarisService } from '../usuaris.service'; // Importa el servei

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {
  usuari: any;
  dni!: string;

  constructor(
    private usuarisService: UsuarisService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Obtenir el DNI de la URL
    this.dni = this.route.snapshot.paramMap.get('id') || '';
    
    // Comprovem si tenim un DNI per obtenir l'usuari
    if (this.dni) {
      // Fem una crida al servei per obtenir l'usuari per DNI
      this.usuarisService.getUsuariByDNI(this.dni).subscribe(
        (usuari) => {
          this.usuari = usuari;
        },
        (error) => {
          console.error('Error al carregar l\'usuari', error);
        }
      );
    }
  }
}
