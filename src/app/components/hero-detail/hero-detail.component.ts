import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { Hero } from "../../models/hero";
import { HeroService } from "../../services/hero.service";

@Component({
  selector: "app-hero-detail",
  templateUrl: "./hero-detail.component.html",
  styleUrls: ["./hero-detail.component.css"]
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero; // currently selected hero
  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}

  ngOnInit() {
    this.getHero();
  }

  getHero(): void {
    // snapshot -> static image of route info
    // paramMap -> dictionary of param values extracted
    // + -> converts string to number
    const id = +this.route.snapshot.paramMap.get("id");
    this.heroService.getHero(id).subscribe(hero => {
      // this.hero = hero;
      console.log("Hero Details", hero);
    });
  }

  goBack(): void {
    this.location.back();
  }
}
