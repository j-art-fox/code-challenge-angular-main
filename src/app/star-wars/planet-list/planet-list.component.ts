import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-planet-list',
  templateUrl: './planet-list.component.html',
})
export class PlanetListComponent implements OnInit {
  @Input() planetData: any = [];
  @Input('requestedPlanet') element!: any;
  @Input() planetActivated: boolean = false;
  @Output() deactivationDetails = new EventEmitter<boolean>();

  fullList: boolean = false;
  viewButton: string = 'View All Planets';

  dropDownDisplayed: boolean = true;

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
  displayDropdown() {
    this.dropDownDisplayed = !this.dropDownDisplayed;
  }

  emitDeactivation() {
    this.deactivationDetails.emit(false);
  }
}
