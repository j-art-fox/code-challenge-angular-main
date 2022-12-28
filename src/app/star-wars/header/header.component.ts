import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  planetsDropDown: boolean;
  dropDownClass = 'hidden';

  planets: any = [
    { name: 'Tatooine' },
    { name: 'Alderaan' },
    { name: 'Yavin IV' },
    { name: 'Hoth' },
    { name: 'Dagobah' },
    { name: 'Bespin' },
    { name: 'Endor' },
    { name: 'Naboo' },
    { name: 'Coruscant' },
    { name: 'Kamino' },
  ];

  changeLogo: boolean;
  constructor() {
    this.changeLogo = false;
    this.planetsDropDown = false;
  }
  showAndHide() {
    if (this.planetsDropDown) {
      this.planetsDropDown = false;
      this.dropDownClass = 'hidden';
    } else {
      this.planetsDropDown = true;
      this.dropDownClass =
        'drop-down-bg font-chakrapetch absolute z-10 w-44 -translate-x-2 outline-rose-200 rounded-xl divide-y divide-rose-900 shadow ease-in-out duration:200';
    }
  }

  ngOnInit(): void {}
}
