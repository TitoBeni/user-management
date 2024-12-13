import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarisService {
  private apiUrl = 'http://localhost:3000/api/usuaris'; // API

  constructor(private http: HttpClient) {}

  // Obtenir la llista d'usuaris
  getUsuaris(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Afegir un nou usuari
  afegirUsuari(usuari: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, usuari);
  }

  // Obtenir un usuari per DNI
  getUsuariByDNI(dni: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${dni}`);
  }
}
