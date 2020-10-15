import { Component, OnInit } from "@angular/core";
import { DatabaseService } from "../database.service";

@Component({
  selector: "app-actor",
  templateUrl: "./actor.component.html",
  styleUrls: ["./actor.component.css"],
})
export class ActorComponent implements OnInit {
  actorsDB: any[] = [];
  moviesDB: any[] = [];

  section = 1;

  fullName: string = "";
  bYear: number = 0;
  actorId: string = "";

  movieName = "";
  movieYear: number = 0;
  movieId: string = "";
  movieYearToDelete: number = 0;

  addActorID: string = "";

  constructor(private dbService: DatabaseService) {}

  //Get all Actors
  onGetActors() {
    this.dbService.getActors().subscribe((data: any[]) => {
      this.actorsDB = data;
    });
  }
  onGetMovies() {
    this.dbService.getMovies().subscribe((data: any[]) => {
      this.moviesDB = data;
    });
  }
  //Create a new Actor, POST request
  onSaveActor() {
    let obj = { name: this.fullName, bYear: this.bYear };
    this.dbService.createActor(obj).subscribe(result => {
      this.onGetActors();
    });
  }
  // Update an Actor
  onSelectUpdate(item) {
    this.fullName = item.name;
    this.bYear = item.bYear;
    this.actorId = item._id;
  }
  onUpdateActor() {
    let obj = { name: this.fullName, bYear: this.bYear };
    this.dbService.updateActor(this.actorId, obj).subscribe(result => {
      this.onGetActors();
    });
  }

  //Delete Actor
  onDeleteActor(item) {
    this.dbService.deleteActor(item._id).subscribe(result => {
      this.onGetActors();
    });
  }
  // This lifecycle callback function will be invoked with the component get initialized by Angular.
  ngOnInit() {
    this.onGetActors();
    this.onGetMovies();
  }

  changeSection(sectionId) {
    this.section = sectionId;
    this.resetValues();
  }

  resetValues() {
    this.fullName = "";
    this.bYear = 0;
    this.actorId = "";
  }

  //Create a new movie, POST request
  onSaveMovie() {
    let obj = { title: this.movieName, year: this.movieYear };
    this.dbService.createMovie(obj).subscribe(result => {
      this.onGetMovies();
    });
  }
  
  //Delete movie
  onDeleteMovie(item) {
    this.dbService.deleteMovie(item._id).subscribe(result => {
      this.onGetMovies();
    });
  }

  //Delete all movies before a year
  onDeleteMovieByYear() {
    this.dbService.deleteMovieByYear(this.movieYearToDelete).subscribe(result => {
      this.onGetMovies();
    });
  }

  //Select actor to add to a movie
  onSelectActorToAdd(item) {
    this.addActorID = item;
    this.changeSection(9);
  }

  //Add actor to movie
  onAddActorToMovie(item) {
    this.dbService.addActorToMovie({id: this.addActorID}, item).subscribe(result => {
      this.onGetMovies();
    });
  }
}