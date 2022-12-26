import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
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

  constructor() {}

  ngOnInit(): void {}
}
