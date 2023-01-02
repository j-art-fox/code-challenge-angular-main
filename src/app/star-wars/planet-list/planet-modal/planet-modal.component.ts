import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { PlanetsService } from '../../planets.service';

@Component({
  selector: 'app-planet-modal',
  templateUrl: './planet-modal.component.html',
})
export class PlanetModalComponent implements OnInit {
  // imports command to activate planet
  @Input() planetActivated: boolean = false;
  // imports details of the selected planet
  @Input() requestedPlanet!: any;
  // resets the booleans to false after rendering a planet
  @Output() deactivationDetails = new EventEmitter<boolean>();

  modalPlanetData: any = {};
  temporaryData: any = [];

  constructor(private planetsService: PlanetsService) {}
  // sets up the modal with the data
  ngOnInit(): void {
    this.planetsService.getPlanets().subscribe((Data: any) => {
      this.temporaryData = Data.results;
      console.log(this.temporaryData);
      for (const planet of this.temporaryData) {
        if (planet.name === this.requestedPlanet.planetName)
          return console.log(planet);
      }
      return (this.modalPlanetData = this.temporaryData);
    });
  }
  // method to reset variables in parent components to false after rendering a planet
  closeModal() {
    this.deactivationDetails.emit(false);
  }
}
