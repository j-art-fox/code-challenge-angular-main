import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-planet-modal',
  templateUrl: './planet-modal.component.html',
  styleUrls: ['./planet-modal.component.scss'],
})
export class PlanetModalComponent implements OnInit {
  @Input() planetActivated: boolean = false;
  @Input('requestedPlanet') element!: { planetName: string };

  constructor() {}

  ngOnInit(): void {}
  closeModal() {
    this.planetActivated = false;
    window.location.reload();
  }
}
