import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-planet-list',
  templateUrl: './planet-list.component.html',
})
export class PlanetListComponent implements OnInit {
  // FOR FULL PLANET LIST
  @Input() planetData: any = [];
  @Input() requestedPlanet!: any;
  @Input() planetActivated: boolean = false;
  @Output() deactivationDetails = new EventEmitter<boolean>();

  fullList: boolean = false;
  viewButton: string = 'View All Planets';
  aboutDropdownDisplayed: boolean = true;

  constructor() {}
  ngOnInit(): void {}

  showFullList() {
    if (this.viewButton === 'View All Planets') {
      this.viewButton = 'Hide All Planets';
    } else {
      this.viewButton = 'View All Planets';
    }
    this.fullList = !this.fullList;
  }

  displayAboutDropdown() {
    this.aboutDropdownDisplayed = !this.aboutDropdownDisplayed;
  }

  emitDeactivation() {
    this.deactivationDetails.emit(false);
  }
}
