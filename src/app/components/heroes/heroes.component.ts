import { Component, OnInit } from "@angular/core";
import { Hero } from "../../models/hero";
import { HeroService } from "../../services/hero.service";

@Component({
  selector: "app-heroes",
  templateUrl: "./heroes.component.html",
  styleUrls: ["./heroes.component.css"]
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];

  // inject service into constructor
  constructor(private heroService: HeroService) {}

  ngOnInit() {
    // get heroes from service
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes => {
      this.heroes = heroes;
      console.log("HEROES:", heroes);
    });
  }
}
