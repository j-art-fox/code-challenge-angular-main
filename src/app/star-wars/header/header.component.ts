import { Component, OnInit, Input } from '@angular/core';
import { PlanetsService } from '../planets.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  @Input() planets: any = [];
  planetsDropDown: boolean;
  dropDownClass = 'hidden';

  constructor(private planetsService: PlanetsService) {
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
