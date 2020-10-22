import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

@Injectable({
  providedIn: "root",
})
export class DatabaseService {
  constructor(private http: HttpClient) {}
  result: any;

  getActors() {
    return this.http.get("http://localhost:8080/actors");
  }
  getActor(id: string) {
    let url = "http://localhost:8080/actors/" + id;
    return this.http.get(url);
  }
  createActor(data) {
    return this.http.post("http://localhost:8080/actors", data, httpOptions);
  }
  updateActor(id, data) {
    let url = "http://localhost:8080/actors/" + id;
    return this.http.put(url, data, httpOptions);
  }
  deleteActor(id) {
    let url = "http://localhost:8080/actors/actorById/" + id;
    return this.http.delete(url, httpOptions);
  }
  createMovie(data) {
    return this.http.post("http://localhost:8080/movies", data, httpOptions);
  }
  getMovies() {
    return this.http.get("http://localhost:8080/movies");
  }
  deleteMovie(id) {
    let url = "http://localhost:8080/movies/byId/" + id;
    return this.http.delete(url, httpOptions);
  }
  deleteMovieByYear(year) {
    let url = "http://localhost:8080/movies/byYear/" + year;
    return this.http.delete(url, httpOptions);
  }
  addActorToMovie(actor, movie) {
    let url = 'http://localhost:8080/movies/' + movie._id + '/actors';
    return this.http.post(url, actor, httpOptions);
  }     
}