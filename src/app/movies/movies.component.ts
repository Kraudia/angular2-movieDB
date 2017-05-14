import { Component, OnInit }        from '@angular/core';
import { ActivatedRoute, Router }   from '@angular/router';
import { Observable }               from 'rxjs/Observable';
import { MoviesService }            from './movies.service';
import { Movie }                    from './movie';

//jQuery
declare var $: any;

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})

export class MoviesComponent implements OnInit {
  movies: Observable<Movie[]>;
  path: string;
  language: string;

  constructor(
    private moviesService: MoviesService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.language = this.moviesService.getLanguage();
    this.getMovies();
    this.route.params.subscribe(
      params => {
        let query = params['query'];
        if (query) this.searchMovies(query);
      });
  }

  getMovies() {
    this.path = "Popularne filmy";
    this.movies = this.moviesService.getMovies();
  }

  searchMovies(query: string) {
    this.path = "Szukaj \"" + query + "\"";
    this.movies = this.moviesService.searchMovies(query);
  }

  onSelect(movie: Movie) {
    this.router.navigate(['./../movie', movie.id]);
  }
}
