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
  isParkingSystemSelected: boolean = false; 

  constructor(private parkingSystemService: ParkingSystemService, private ruleservice: RuleService) { }

  ngOnInit() {
    this.getParkingSystems();
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
          this.isParkingSystemSelected = true; // Set the flag to true when parking system is selected
        },
        (error) => {
          console.error('Error fetching rules:', error);
        }
      );
    }
  }

  onSelectParkingSystem() {
    if (this.selectedParkingSystemId !==0) {
      this.getRulesForSelectedParkingSystem();
    } 
    else {
      this.isParkingSystemSelected = false; 
    }
  }
}

