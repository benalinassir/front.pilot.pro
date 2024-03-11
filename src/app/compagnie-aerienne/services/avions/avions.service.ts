import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Avion } from '../../models/avions/avions.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AvionsService {
  private apiUrl = environment.apiUrl+'Avions';
  constructor(private http: HttpClient) { }

  // Obtient tous les avions
  getPlanes(): Observable<Avion[]> {
    return this.http.get<Avion[]>(this.apiUrl);
  }

  // Obtient un avion par son numéro d'avion
  getPlaneByNum(numAvion: number): Observable<Avion> {
    return this.http.get<Avion>(`${this.apiUrl}/${numAvion}`);
  }

  // Crée un nouvel avion
  createPlane(avion: Avion): Observable<Avion> {
    return this.http.post<Avion>(this.apiUrl, avion);
  }

  // Met à jour un avion existant
  updatePlane(avion: Avion): Observable<Avion> {
    return this.http.put<Avion>(`${this.apiUrl}/${avion.numAvion}`, avion);
  }

  // Supprime un avion
  deletePlane(numAvion: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${numAvion}`);
  }
}
