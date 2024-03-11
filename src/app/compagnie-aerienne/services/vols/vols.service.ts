import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vol } from '../../models/vols/vols.model';
import { environment } from 'src/environments/environment';
environment
@Injectable({
  providedIn: 'root'
})
export class VolsService {
  private apiUrl = environment.apiUrl+'Vols';

  constructor(private http: HttpClient) { }

  // Obtient tous les vols
  public getFlights(): Observable<Vol[]> {
    return this.http.get<Vol[]>(this.apiUrl);
  }

  // Obtient un vol par son numéro de vol
  public getFlightById(numVol: number): Observable<Vol> {
    return this.http.get<Vol>(`${this.apiUrl}/${numVol}`);
  }

  // Crée un nouveau vol
  public createFlight(vol: Vol): Observable<Vol> {
    return this.http.post<Vol>(this.apiUrl, vol);
  }

  // Met à jour un vol existant
  public updateFlight(vol: Vol): Observable<Vol> {
    return this.http.put<Vol>(`${this.apiUrl}/${vol.numvol}`, vol);
  }

  // Supprime un vol
  public deleteFlight(numVol: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${numVol}`);
  }
}
