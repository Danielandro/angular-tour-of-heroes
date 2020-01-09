import { Component, OnInit } from "@angular/core";
import { Hero } from "../hero";
import { HeroService } from "../hero.service";

@Component({
  selector: "app-heroes",
  templateUrl: "./heroes.component.html",
  styleUrls: ["./heroes.component.css"]
})
export class HeroesComponent implements OnInit {
  selectedHero: Hero;
  heroes: Hero[];

  // inject service into constructor
  constructor(private heroService: HeroService) {}

  ngOnInit() {
    // subscribe to returned observable to access heroes
    this.heroService.getHeroes().subscribe(heroes => {
      this.heroes = heroes;
    });
  }

  // set selected hero
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
}
