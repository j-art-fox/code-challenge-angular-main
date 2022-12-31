import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { PlanetsService } from '../../planets.service';

@Component({
  selector: 'app-planet-modal',
  templateUrl: './planet-modal.component.html',
  styleUrls: ['./planet-modal.component.scss'],
})
export class PlanetModalComponent implements OnInit, OnChanges {
  @Input() planetActivated: boolean = false;
  @Input('requestedPlanet') requestedPlanet!: any;
  modalPlanetData: any = {};
  temporaryData: any = [{}];

  constructor(private planetsService: PlanetsService) {}

  ngOnInit(): void {
    this.planetsService.getPlanets().subscribe((Data: any) => {
      this.temporaryData = Data.results;
      console.log(this.temporaryData);

      for (const planet of this.temporaryData) {
        if (planet.name === this.requestedPlanet.planetName)
          return console.log(planet);
      }

      for (const iterator of this.temporaryData) {
        iterator.active = false;
      }
      return (this.modalPlanetData = this.temporaryData);
    });
  }

  //the code below has no obvious bugs, but isn't performing the intended function of rendering a new planet details modal.
  ngOnChanges(changes: SimpleChanges): void {
    let data: {} = changes;
    console.log(data);
    for (const planet of this.temporaryData) {
      if (planet.name === this.requestedPlanet.planetName)
        return console.log(planet);
    }

    return (this.modalPlanetData = this.temporaryData);
  }

  closeModal() {
    this.planetActivated = !this.planetActivated;
    // There has to be a better way to do this　⇩
    // window.location.reload();
  }
}
