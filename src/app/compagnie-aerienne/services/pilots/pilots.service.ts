import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pilot } from '../../models/pilots/pilots.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PilotsService {
  private apiUrl = environment.apiUrl+'Pilotes';


  constructor(private http: HttpClient) { }

  // Obtient tous les pilotes
  public getPilots(): Observable<Pilot[]> {
    return this.http.get<Pilot[]>(this.apiUrl);
  }

  // Obtient un pilote par son numéro de pilote
  public getPilotByNum(numPilote: number): Observable<Pilot> {
    return this.http.get<Pilot>(`${this.apiUrl}/${numPilote}`);
  }

  // Crée un nouveau pilote
  public createPilot(pilot: Pilot): Observable<Pilot> {
    return this.http.post<Pilot>(this.apiUrl, pilot);
  }

  // Met à jour un pilote existant
  public updatePilot(pilot: Pilot): Observable<Pilot> {
    return this.http.put<Pilot>(`${this.apiUrl}/${pilot.numPilote}`, pilot);
  }

  // Supprime un pilote
  public deletePilot(numPilote: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${numPilote}`);
  }
}
