import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ParkingSystemDTO } from './parking-system.dto'; 
import { RuleDTO } from './rule.dto'; 
import { environment } from '../environments/development-environment/environment'; 


@Injectable({
  providedIn: 'root'
})
export class ParkingSystemService {
  private apiUrl = `${environment.apiUrl}/parking-system`

  constructor(private http: HttpClient) { }

  getParkingSystems(): Observable<ParkingSystemDTO[]> {
    return this.http.get<ParkingSystemDTO[]>(`${this.apiUrl}/all`);
  }
  getRulesForParkingSystem(parkingSystemId: number): Observable<RuleDTO[]> {
    return this.http.get<RuleDTO[]>(`${this.apiUrl}/parking-systems/${parkingSystemId}/rules`);
  }
  
}

