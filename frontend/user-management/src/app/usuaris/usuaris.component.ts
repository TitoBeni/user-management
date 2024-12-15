import { Component, OnInit } from '@angular/core';
import { UsuarisService } from '../usuaris.service';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx'; // Per exportar a Excel
import jsPDF from 'jspdf'; // Per exportar a PDF
import 'jspdf-autotable'; // Per crear taules al PDF

@Component({
  selector: 'app-usuaris',
  templateUrl: './usuaris.component.html',
  styleUrls: ['./usuaris.component.scss'],
})
export class UsuarisComponent implements OnInit {
  usuaris: any[] = [];
  filtreText: string = '';
  ordre: string = '';
  ordreAscendent: boolean = true;
  paginaActual: number = 1;
  elementsPerPagina: number = 5;

  constructor(private usuarisService: UsuarisService, private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.carregarUsuaris();
  }

  // Funció per carregar usuaris de l'API
  carregarUsuaris(): void {
    this.usuarisService.getUsuaris().subscribe(
      (data: any[]) => {
        this.usuaris = data;
      },
      (error: any) => {
        console.error('Error al carregar usuaris', error);
      }
    );
  }

  // Funció per carregar usuaris del JSON i enviar-los a l'API
  carregarUsuarisDelJSON(event: any): void {
    const fitxer = event.target.files[0];
    if (fitxer) {
      const lector = new FileReader();
      lector.onload = (e: any) => {
        try {
          const dadesJSON = JSON.parse(e.target.result);
          this.usuaris = dadesJSON.map((usuari: any) => ({
            nom: usuari.name,        
            cognoms: usuari.surname, 
            email: usuari.email,     
            dni: usuari.id           
          }));
          
          this.afegirUsuarisAPIDatabase(this.usuaris);

        } catch (error) {
          console.error('Error al carregar el JSON', error);
        }
      };
      lector.readAsText(fitxer);
    }
  }

  // Funció per enviar els usuaris a l'API
  afegirUsuarisAPIDatabase(usuaris: any[]): void {
    const apiEndpoint = 'http://localhost:3000/api/usuaris';
    this.httpClient.post(apiEndpoint, usuaris).subscribe(
      (response) => {
        console.log('Usuaris afegits correctament', response);
        this.carregarUsuaris();
      },
      (error) => {
        console.error('Error al enviar els usuaris', error);
      }
    );
  }

  // Funció per filtrar els usuaris
  usuarisFiltrats(): any[] {
    if (!this.filtreText) {
      return this.usuaris;
    }

    const filtre = this.filtreText.toLowerCase();
    return this.usuaris.filter((usuari) =>
      Object.values(usuari).some((valor) => {
        if (valor !== null && valor !== undefined) {
          return valor.toString().toLowerCase().includes(filtre);
        }
        return false;
      })
    );
  }

  // Funció per ordenar
  ordenar(propietat: string): void {
    if (this.ordre === propietat) {
      this.ordreAscendent = !this.ordreAscendent;
    } else {
      this.ordre = propietat;
      this.ordreAscendent = true;
    }

    this.usuaris.sort((a, b) => {
      const valorA = a[propietat].toString().toLowerCase();
      const valorB = b[propietat].toString().toLowerCase();
      return this.ordreAscendent
        ? valorA.localeCompare(valorB)
        : valorB.localeCompare(valorA);
    });
  }

  // Funció per obtenir els usuaris de la pàgina actual
  usuarisFiltratsPaginats(): any[] {
    const inici = (this.paginaActual - 1) * this.elementsPerPagina;
    const final = inici + this.elementsPerPagina;
    return this.usuarisFiltrats().slice(inici, final);
  }

  // Funció per canviar de pàgina
  canviarPagina(pagina: number): void {
    if (pagina > 0 && (pagina - 1) * this.elementsPerPagina < this.usuarisFiltrats().length) {
      this.paginaActual = pagina;
    }
  }

  // Funció per exportar a Excel
  exportarExcel(): void {
    const worksheet = XLSX.utils.json_to_sheet(this.usuarisFiltrats());
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Usuaris');
    XLSX.writeFile(workbook, 'usuaris.xlsx');
  }

  // Funció per exportar a PDF
  exportarPDF(): void {
    const doc = new jsPDF();
    const columnHeaders = ['Nom', 'Cognoms', 'Email', 'DNI'];
    const rows = this.usuaris.map((usuari) => [
      usuari.nom,
      usuari.cognoms,
      usuari.email,
      usuari.dni,
    ]);

    (doc as any).autoTable({
      head: [columnHeaders],
      body: rows,
    });

    doc.save('usuaris.pdf');
  }
}
