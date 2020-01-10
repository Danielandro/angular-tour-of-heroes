import { Injectable } from "@angular/core";
import { Hero } from "./hero";
import { HEROES } from "./mock-heroes";
import { Observable, of } from "rxjs";
import { MessageService } from "./message.service";

@Injectable({
  // register a provider with the root injector
  // enables service injected throughout app
  providedIn: "root"
})
export class HeroService {
  constructor(private messageService: MessageService) {}

  // return mock heroes
  getHeroes(): Observable<Hero[]> {
    this.messageService.add("HeroService: Fetched heroes");
    return of(HEROES); // returns a single value - array of heroes
  }

  getHero(id: number): Observable<Hero> {
    this.messageService.add(`HeroService: Fetched hero id=${id}`);
    return of(HEROES.find(hero => hero.id === id));
  }
}
