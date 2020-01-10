import { Injectable } from "@angular/core";
import { Hero } from "../models/hero";
import { Observable, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { MessageService } from "./message.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  // register a provider with the root injector
  // enables service injected throughout app
  providedIn: "root"
})
export class HeroService {
  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) {}

  private heroesUrl = "https://jsonplaceholder.typicode.com/users"; // url to web api

  // return mock heroes
  getHeroes(): Observable<Hero[]> {
    return this.http
      .get<Hero[]>(this.heroesUrl)
      .pipe(catchError(this.handleError<Hero[]>("getHeroes", []))); // return empty error if observable fails
  }

  getHero(id: number) {
    this.log(`Fetched hero id=${id}`);
    // return of(HEROES.find(hero => hero.id === id));
    // return this.getHeroes().map(heroes => heroes.find(hero => hero.id === id));
    return this.getHeroes().pipe(tap(arr => console.log("Tap: ", arr)));
  }

  private log(message: string): void {
    this.messageService.add(`HeroService: ${message}`);
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
