import { Component, OnInit, Input } from '@angular/core';
import { PlanetsService } from '../../planets.service';

@Component({
  selector: 'app-planet-modal',
  templateUrl: './planet-modal.component.html',
  styleUrls: ['./planet-modal.component.scss'],
})
export class PlanetModalComponent implements OnInit {
  @Input() planetActivated: boolean = false;
  @Input('requestedPlanet') element!: any;
  modalPlanetData: any = {};

  constructor(private planetsService: PlanetsService) {}

  ngOnInit(): void {
    this.planetsService.getPlanets().subscribe((Data: any) => {
      let tempData: any = [{}];
      tempData = Data.results;
      console.log(tempData);

      for (const planet of tempData) {
        if (planet.name === this.element.planetName) return console.log(planet);
      }

      for (const iterator of tempData) {
        iterator.active = false;
      }
      return (this.modalPlanetData = tempData);
    });
  }

  closeModal() {
    this.planetActivated = false;
    window.location.reload();
  }

  displayDetails() {
    if (this.element) console.log(this.element);
  }
}
