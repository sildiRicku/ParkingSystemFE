import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ParkingSystemService } from '../parking-system.service';
import { ParkingSystemDTO } from '../parking-system.dto';
import { RuleDTO } from '../rule.dto'; 
import { AuthServiceService } from '../auth.service';
import { SessionService } from '../session.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-second-page',
  templateUrl: './rule-page.component.html',
  styleUrls: ['./rule-page.component.css']
})
export class RulePageComponent implements OnInit {
  @ViewChild('sessionTimeoutModal') sessionTimeoutModal!: TemplateRef<any>;
  modalRef!: BsModalRef;
  parkingSystems: ParkingSystemDTO[] = [];
  selectedParkingSystemId: number = 0;
  selectedParkingSystemRules: RuleDTO[] = []; 
  isParkingSystemSelected: boolean = false; 
  sortColumn: string = ''; 
  sortAscending: boolean = true; 
  authService: any;

  constructor(private parkingSystemService: ParkingSystemService,private modalService: BsModalService) { }

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
  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
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
    
      this.selectedParkingSystemRules.sort((a, b) => {
        const valueA = a[column as keyof RuleDTO];
        const valueB = b[column as keyof RuleDTO];
    
        if (typeof valueA === 'number' && typeof valueB === 'number') {
          return this.sortAscending ? valueA - valueB : valueB - valueA;
        } else if (typeof valueA === 'string' && typeof valueB === 'string') {
          const comparison = valueA.localeCompare(valueB);
          return this.sortAscending ? comparison : -comparison;
        } else {
          return 0;
        }
      });
    }
  }
  

