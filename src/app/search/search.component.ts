import { Component, OnInit }        from '@angular/core';
import { Router }                   from '@angular/router';

declare var $: any; //jQuery

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
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
