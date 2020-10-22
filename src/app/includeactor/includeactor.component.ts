import { Component, OnInit } from '@angular/core';
import { DatabaseService } from "../database.service";

@Component({
  selector: 'app-includeactor',
  templateUrl: './includeactor.component.html',
  styleUrls: ['./includeactor.component.css']
})
export class IncludeactorComponent implements OnInit {
  actorsDB: any[] = [];
  moviesDB: any[] = [];
  selectedActor: any = {};
  
  constructor(private dbService: DatabaseService) { }

  onGetActors() {
    return this.dbService.getActors().subscribe((data: any[]) => {
      this.actorsDB = data;
    });
  }

  onGetMovies() {
    return this.dbService.getMovies().subscribe((data: any[]) => {
      this.moviesDB = data;
    });
  }

  ngOnInit(): void {
    this.onGetActors();
    this.onGetMovies();
  }

  onSelectActor(item) {
    this.selectedActor = item;
  }

  onAddActorToMovie(item) {
    this.dbService.addActorToMovie({id: this.selectedActor._id}, item).subscribe(result => {
      this.onGetMovies();
    });
  }

}
