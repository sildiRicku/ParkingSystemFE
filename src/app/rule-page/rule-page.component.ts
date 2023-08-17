import { Component, OnInit } from '@angular/core';
import { ParkingSystemService } from '../parking-system.service';
import { RuleService } from '../rule.service';
import { ParkingSystemDTO } from '../parking-system.dto';
import { RuleDTO } from '../rule.dto'; 

@Component({
  selector: 'app-second-page',
  templateUrl: './rule-page.component.html',
  styleUrls: ['./rule-page.component.css']
})
export class RulePageComponent implements OnInit {
  parkingSystems: ParkingSystemDTO[] = [];
  selectedParkingSystemId: number = 0;
  selectedParkingSystemRules: RuleDTO[] = []; 

  constructor(private parkingSystemService: ParkingSystemService,private ruleservice: RuleService) { }

  ngOnInit() {
    this.getParkingSystems();
    this.getRulesForSelectedParkingSystem();
  }

  getParkingSystems() {
    this.parkingSystemService.getParkingSystems().subscribe(
      (parkingSystems) => {
        this.parkingSystems = parkingSystems;
      },
      (error) => {
        console.error('Error fetching parking systems:', error);
      }
    );
  }

  getRulesForSelectedParkingSystem() {
    if (this.selectedParkingSystemId !== 0) {
      this.ruleservice.getRulesForParkingSystem(this.selectedParkingSystemId).subscribe(
        (rules) => {
          this.selectedParkingSystemRules = rules;
        },
        (error) => {
          console.error('Error fetching rules:', error);
        }
      );
    }
  }

 onSelectParkingSystem() {
    this.getRulesForSelectedParkingSystem();
  }
}
