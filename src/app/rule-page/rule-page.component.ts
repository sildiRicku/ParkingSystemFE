import { Component, OnInit } from '@angular/core';
import { ParkingSystemService } from '../parking-system.service';
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
  sortColumn: string = ''; 
  sortAscending: boolean = true; 

  constructor(private parkingSystemService: ParkingSystemService) { }

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
      this.parkingSystemService.getRulesForParkingSystem(this.selectedParkingSystemId).subscribe(
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
 
  
    sortTable(column: string) {
      if (this.sortColumn === column) {
        this.sortAscending = !this.sortAscending;
      } else {
        this.sortColumn = column;
        this.sortAscending = true;
      }
    
      // Implement sorting logic based on the 'column' parameter and 'sortAscending' flag
      this.selectedParkingSystemRules.sort((a, b) => {
        const valueA = a[column as keyof RuleDTO];
        const valueB = b[column as keyof RuleDTO];
    
        if (typeof valueA === 'number' && typeof valueB === 'number') {
          return this.sortAscending ? valueA - valueB : valueB - valueA;
        } else if (typeof valueA === 'string' && typeof valueB === 'string') {
          const comparison = valueA.localeCompare(valueB);
          return this.sortAscending ? comparison : -comparison;
        } else {
          // Handle other data types or mixed types if needed
          return 0;
        }
      });
    }
  }
  

