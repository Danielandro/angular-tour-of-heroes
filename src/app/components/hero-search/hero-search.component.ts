import { Component, OnInit } from "@angular/core";
import { Observable, Subject } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  tap
} from "rxjs/operators";

import { Hero } from "../../models/hero";
import { HeroService } from "../../services/hero.service";

@Component({
  selector: "app-hero-search",
  templateUrl: "./hero-search.component.html",
  styleUrls: ["./hero-search.component.css"]
})
export class HeroSearchComponent implements OnInit {
  heroes$: Observable<Hero[]>;
  private searchTerms = new Subject<string>();
  constructor(private heroService: HeroService) {}

  // push search term into observable stream
  search(term: string): void {
    this.searchTerms.next(term);
  }
  ngOnInit() {
    this.heroes$ = this.searchTerms.pipe(
      // wait 300ms aftere each keystroke before considering the term
      debounceTime(300),
      // ignore new term if same as previous term
      distinctUntilChanged(),
      // switch to new search observable each time the term changes
      switchMap((term: string) => this.heroService.searchHeroes(term))

      /*
      Each operator works as follows:

      * debounceTime(300) waits until the flow of new string events pauses for 
        300 milliseconds before passing along the latest string. 
        You'll never make requests more frequently than 300ms.

      * distinctUntilChanged() ensures that a request is sent only if the 
        filter text changed.

      * switchMap() calls the search service for each search term that makes it 
        through debounce() and distinctUntilChanged(). 
        It cancels and discards previous search observables, 
        returning only the latest search service observable.
       */
    );
  }
}
