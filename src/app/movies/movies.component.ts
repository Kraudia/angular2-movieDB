import { Component, OnInit }        from '@angular/core';
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
  errorMessage: string;
  movies: Observable<Movie[]>;
  selectedMovie: Movie;
  path: string;

  constructor(private moviesService: MoviesService) { }

  ngOnInit() {
    this.getMovies();

    // fix main menu to page on passing
    $('#search').visibility({
      type: 'fixed'
    });
  }

  getMovies() {
    this.path = "Popularne filmy";
    this.movies = this.moviesService.getMovies();
  }

  search(query: string) {
    if (/\S/.test(query)) {
      this.path = 'Szukasz \"' + query + '\"';
      this.movies = this.moviesService.searchMovies(query);
    } else {
      this.getMovies();
    }
  }

  getDetails(id: number) {
    this.moviesService.getDetails(id)
      .subscribe(
        questions => {
          this.selectedMovie = questions;
        },
        error => this.errorMessage = <any>error);
  }

  onSelect(movie: Movie) {
    this.getDetails(movie.id);
    $('.ui.modal')
      .modal('setting', 'transition', 'scale')
      .modal({
        blurring: true
      })
      .modal('show')
    ;
  }

  close() {
    $('.ui.modal')
      .modal('hide')
    ;
  }

}
