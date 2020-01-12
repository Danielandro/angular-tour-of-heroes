import { Component, OnInit } from "@angular/core";
import { Hero } from "../../models/hero";
import { HeroService } from "../../services/hero.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-heroes",
  templateUrl: "./heroes.component.html",
  styleUrls: ["./heroes.component.css"]
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];

  // inject service into constructor
  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // get heroes from service
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes => {
      this.heroes = heroes;
    });
  }

  // create hero if name is not empty
  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    } // if no name provided
    this.heroService.addHero({ name } as Hero).subscribe(() => {
      console.log("Adding a new Hero...");
    });
  }
}
