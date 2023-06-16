import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ParkingSystemDTO } from './parking-system.dto'; // Assuming you have a DTO class for parking systems


@Injectable({
  providedIn: 'root'
})
export class ParkingSystemService {
  private apiUrl = 'http://localhost:8080/parking-system';

  constructor(private http: HttpClient) { }

  getParkingSystems(): Observable<ParkingSystemDTO[]> {
    return this.http.get<ParkingSystemDTO[]>(`${this.apiUrl}/all`);
  }
}

