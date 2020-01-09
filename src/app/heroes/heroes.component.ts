import { Component, OnInit } from "@angular/core";
import { Hero } from "../hero";
import { HEROES } from "../mock-heroes";

@Component({
  selector: "app-heroes",
  templateUrl: "./heroes.component.html",
  styleUrls: ["./heroes.component.css"]
})
export class HeroesComponent implements OnInit {
  hero: Hero = {
    id: 1,
    name: "Windstorm"
  };

  heroes = HEROES; // mock array of heroes
  selectedHero: Hero; // currently selected hero

  // set selected hero
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    console.log(this.selectedHero);
  }

  constructor() {}

  ngOnInit() {}
}
