import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  EventEmitter,
  Output,
} from '@angular/core';
import { PlanetsService } from '../../planets.service';

@Component({
  selector: 'app-planet-modal',
  templateUrl: './planet-modal.component.html',
})
export class PlanetModalComponent implements OnInit, OnChanges {
  // imports command to activate planet
  @Input() planetActivated: boolean = false;

  @Input('requestedPlanet') requestedPlanet!: any;
  @Output() deactivationDetails = new EventEmitter<boolean>();
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
      return (this.modalPlanetData = this.temporaryData);
    });
  }

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
    this.deactivationDetails.emit(false);
  }
}
