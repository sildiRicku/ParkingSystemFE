import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RuleDTO } from './rule.dto'; // Import RuleDTO interface
import { ParkingSystemDTO } from './parking-system.dto'; 

@Injectable({
  providedIn: 'root'
})
export class RuleService {
  private apiUrl = 'http://localhost:8080/rule';

  constructor(private http: HttpClient) { }

  getRulesForParkingSystem(parkingSystemId: number): Observable<RuleDTO[]> {
    return this.http.get<RuleDTO[]>(`${this.apiUrl}/parking-systems/${parkingSystemId}/rules`);
  }
}
