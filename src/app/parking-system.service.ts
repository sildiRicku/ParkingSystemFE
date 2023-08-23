import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ParkingSystemDTO } from './parking-system.dto'; 
import { RuleDTO } from './rule.dto'; // Import RuleDTO here



@Injectable({
  providedIn: 'root'
})
export class ParkingSystemService {
  private apiUrl = 'http://localhost:8080/parking-system';

  constructor(private http: HttpClient) { }

  getParkingSystems(): Observable<ParkingSystemDTO[]> {
    return this.http.get<ParkingSystemDTO[]>(`${this.apiUrl}/all`);
  }
  getRulesForParkingSystem(parkingSystemId: number): Observable<RuleDTO[]> {
    return this.http.get<RuleDTO[]>(`${this.apiUrl}/parking-systems/${parkingSystemId}/rules`);
  }
  
}

