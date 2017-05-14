import { Component, OnInit }        from '@angular/core';
import { Router }                   from '@angular/router';
import { MoviesService }            from '../movies/movies.service';

declare var $: any; //jQuery

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  language : string;
  holder: string;

  constructor(
    private moviesService: MoviesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.language = this.moviesService.getLanguage();
    if (this.language == 'pl') this.holder = 'czego szukasz?';
    else this.holder = 'what are you looking for?';
    this.sticky();
  }

  sticky() {
    $('#search').visibility({
      type: 'fixed',
      once: true,
      transition: {
        animation: 'fade in',
        duration   : '1s',
      }
    });
  }

  search(query: string) {
    if (/\S/.test(query)) {
      this.router.navigate(['/search', query]);
    }
  }

}
