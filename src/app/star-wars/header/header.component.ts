import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  planetsDropDown: boolean;
  dropDownClass="hidden";
  navData = [
    { text: 'home', href: '/', class: 'class="mr-5 hover:text-gray-900"' },
    {
      text: 'planets',
      href: '/planets',
      class: 'class="mr-5 hover:text-gray-900"',
    },
    {
      text: 'about',
      href: '/about',
      class: 'class="mr-5 hover:text-gray-900"',
    },
  ];
  
  changeLogo: boolean;
  constructor() {
    this.changeLogo = false;
    this.planetsDropDown = false;
    
  }
  showAndHide(){
    if(this.planetsDropDown) {
      this.planetsDropDown = false;
      this.dropDownClass = "hidden";
    } else {
      this.planetsDropDown = true;
      this.dropDownClass = "absolute -translate-x-8 z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 ease-in-out duration:200";
    }
  }

  ngOnInit(): void {}
}
