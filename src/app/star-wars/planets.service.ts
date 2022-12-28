import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { People, Planet } from './star-wars.interface';

@Injectable({ providedIn: 'root' })
export class PlanetsService {
  constructor(private http: HttpClient) {
    // Example on getting planets from swapi api
    this.getPlanets().subscribe((planets: any) => {
      // console.log(planets.results);
    });
    this.getPeople().subscribe((people: any) => {
      // console.log(people.results);
    });
  }

  getPlanets(): Observable<Planet[]> {
    const planetApiUrl = 'https://swapi.dev/api/planets';
    // console.log(planetApiUrl);
    return this.http.get<Planet[]>(planetApiUrl);
  }

  getPeople(): Observable<People[]> {
    const peopleApiUrl = 'https://swapi.dev/api/people';
    // console.log(peopleApiUrl);
    return this.http.get<People[]>(peopleApiUrl);
  }
}
