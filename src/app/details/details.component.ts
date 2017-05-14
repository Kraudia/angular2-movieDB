import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router }   from '@angular/router';
import { MoviesService }            from '../movies/movies.service';
import { Movie }                    from '../movies/movie';
import {Location} from '@angular/common';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  selectedMovie: Movie;
  errorMessage: string;
  language: string;

  constructor(
    private moviesService: MoviesService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.language = this.moviesService.getLanguage();
    this.route.params.subscribe(
      params => {
        let id = params['id'];
        if (id) this.getDetails(id);
      });
  }

  getDetails(id: number) {
    this.moviesService.getDetails(id)
      .subscribe(
        response => this.selectedMovie = response,
        error => this.errorMessage = <any>error);
  }

  back() {
    this.location.back();
  }
}
