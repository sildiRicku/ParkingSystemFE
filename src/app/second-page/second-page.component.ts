
import { Component, OnInit } from '@angular/core';
import { ParkingSystemService } from '../parking-system.service';
import { ParkingSystemDTO } from '../parking-system.dto';

@Component({
  selector: 'app-second-page',
  templateUrl: './second-page.component.html',
  styleUrls: ['./second-page.component.css']
})
export class SecondPageComponent implements OnInit {
  parkingSystems: ParkingSystemDTO[] = [];
  selectedParkingSystemId: number = 0;

  constructor(private parkingSystemService: ParkingSystemService) { }

  ngOnInit() {
    this.getParkingSystems();
  }
  getParkingSystems() {
    this.parkingSystemService.getParkingSystems().subscribe(
      (parkingSystems) => {
        console.log(parkingSystems);
        this.parkingSystems = parkingSystems;
      },
      (error) => {
        console.error('Error fetching parking systems:', error);
      }
    );
  }
}