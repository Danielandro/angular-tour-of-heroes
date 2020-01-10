import { Injectable } from "@angular/core";
import { Hero } from "../models/hero";
import { Observable, of } from "rxjs";
import { catchError, map, tap, filter } from "rxjs/operators";
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

  private heroesUrl = "http://localhost:3000/heroes"; // url to web api

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      tap(_ => this.log("fetched heroes")),
      catchError(this.handleError<Hero[]>("getHeroes", []))
    ); // return empty error if observable fails
  }

  getHero(id: number): Observable<Hero> {
    return this.getHeroes().pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      map(heroes => heroes.find(hero => hero.id === id)),
      catchError(this.handleError<Hero>("getHero"))
    );
  }

  updateHero(hero: Hero): Observable<any> {
    return this.http.patch(`${this.heroesUrl}/${hero.id}`, hero).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<Hero>("updateHero"))
    );
  }

  deleteHero(hero: Hero): Observable<any> {
    return this.http.delete(`${this.heroesUrl}/${hero.id}`).pipe(
      tap(_ => this.log(`deleted hero id=${hero.id}`)),
      catchError(this.handleError<Hero>("deleteHero"))
    );
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

  // getArray() {
  //   return of(1, 2, 3, 4, 5, 6, 7).pipe(
  //     filter(num => num % 2 === 0),
  //     map(num => `this is a even num: ${num}`)
  //   );
  // }
}
