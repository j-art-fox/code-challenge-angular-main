import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PlanetsService } from '../planets.service';
import { Planet } from '../star-wars.interface';
@Component({
  selector: 'app-jumbotron',
  templateUrl: './jumbotron.component.html',
})
export class JumbotronComponent implements OnInit {
  @Output() planetRequestDetails = new EventEmitter<{
    name: string;
    rotation_period: string;
    orbital_period: string;
    diameter: string;
    climate: string;
    gravity: string;
    terrain: string;
    surface_water: string;
    population: string;
    residents?: string[] | null;
    films?: string[] | null;
    created: string;
    edited: string;
    url: string;
  }>();
  @Output() activationDetails = new EventEmitter<boolean>();
  // From the API call
  planets: Planet[] = [];

  newPlanetRequest: any = {};
  showSpinner: boolean = true;
  dropDownDisplayed: boolean = true;

  constructor(private planetsService: PlanetsService) {}

  ngOnInit(): void {
    // GETS and SORTS data from API

    this.planetsService.getPlanets().subscribe({
      next: (Data: any) => {
        this.showSpinner = false;
        let tempData: any = [{ name: 'Boyd' }, { name: 'Aaron' }];
        tempData = Data.results;

        tempData.sort(function (a: any, b: any) {
          if (a.name.toLowerCase() < b.name.toLowerCase()) {
            return -1;
          }
          if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return 1;
          }
          return 0;
        });

        this.planets = tempData;
        return (this.showSpinner = false);
      },
      error: (Error: any) => {
        console.log(Error);
      },
      // complete: () => {
      //   console.log('optional method for after "next"');
      // },
    });
  }

  activatePlanet(event: any) {
    this.showPlanetDetails(event);
    this.activatePanel();
  }

  activatePanel() {
    this.activationDetails.emit(true);
    console.log('here');
  }

  showPlanetDetails(event: any) {
    let target = event.target;
    let selectedPlanet: {} = {};
    for (const planet of this.planets) {
      if (planet.name === target.id || planet.name === target.name) {
        selectedPlanet = planet;
      }
    }
    this.newPlanetRequest = selectedPlanet;
    this.planetRequestDetails.emit({
      name: this.newPlanetRequest.name,
      rotation_period: this.newPlanetRequest.rotation_period,
      orbital_period: this.newPlanetRequest.orbital_period,
      diameter: this.newPlanetRequest.diameter,
      climate: this.newPlanetRequest.climate,
      gravity: this.newPlanetRequest.gravity,
      terrain: this.newPlanetRequest.terrain,
      surface_water: this.newPlanetRequest.surface_water,
      population: this.newPlanetRequest.population,
      residents: [this.newPlanetRequest.residents],
      films: [this.newPlanetRequest.films],
      created: this.newPlanetRequest.created,
      edited: this.newPlanetRequest.edited,
      url: this.newPlanetRequest.url,
    });
  }
  displayDropdown() {
    this.dropDownDisplayed = !this.dropDownDisplayed;
  }
}
