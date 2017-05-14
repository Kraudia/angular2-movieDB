import { Component, OnInit }        from '@angular/core';
import { Router }                   from '@angular/router';
import { Observable }               from 'rxjs/Observable';
import { MoviesService }            from './movies.service';
import { Movie }                    from './movie';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})

export class MoviesComponent implements OnInit {
  movies: Observable<Movie[]>;
  language: string;
  sort: number;

  constructor(
    private moviesService: MoviesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.language = this.moviesService.getLanguage();
    this.getMovies();
  }

  getMovies() {
    this.movies = this.moviesService.getMovies();
  }

  dynamicSort(property) {
    let sortOrder = 1;
    if(property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function (a,b) {
      let result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      return result * sortOrder;
    }
  }

  sortMovies(property: string) {
    if (property == 'title') {
      if (this.sort == 1) {
        this.movies = this.movies.map(items => items.sort(this.dynamicSort("-title")));
        this.sort = -1;
      }
      else {
        this.movies = this.movies.map(items => items.sort(this.dynamicSort("title")));
        this.sort = 1;
      }
    }
    else if (property == 'popularity') {
      if (this.sort == 2) {
        this.movies = this.movies.map(items => items.sort(this.dynamicSort("-popularity")));
        this.sort = -2;
      }
      else {
        this.movies = this.movies.map(items => items.sort(this.dynamicSort("popularity")));
        this.sort = 2;
      }
    }
  }

  onSelect(movie: Movie) {
    this.router.navigate(['./../movie', movie.id]);
  }
}
