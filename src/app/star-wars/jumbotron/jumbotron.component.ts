import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-jumbotron',
  templateUrl: './jumbotron.component.html',
})
export class JumbotronComponent implements OnInit {
  @Output() requestDetails = new EventEmitter<{ planetName: string }>();
  @Output() activationDetails = new EventEmitter<boolean>();

  displayPlanetList: boolean = true;

  newPlanetRequest = '';
  // Array of planet names for pulling up the images of the planets from the assets folder.
  planets: any = [
    { name: 'Alderaan' },
    { name: 'Tatooine' },
    { name: 'Yavin IV' },
    { name: 'Hoth' },
    { name: 'Dagobah' },
    { name: 'Bespin' },
    { name: 'Endor' },
    { name: 'Naboo' },
    { name: 'Coruscant' },
    { name: 'Kamino' },
  ];

  constructor() {}

  ngOnInit(): void {}

  activatePanel() {
    this.activationDetails.emit(true);
  }

  showPlanetDetails(event: any) {
    let target = event.target;
    this.newPlanetRequest = target.id;
    console.log(this.newPlanetRequest);

    // start here
    this.requestDetails.emit({
      planetName: this.newPlanetRequest,
    });
  }
}
