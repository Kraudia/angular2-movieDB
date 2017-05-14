import { Injectable }               from '@angular/core';
import { Http, Response }           from '@angular/http';
import { Observable }               from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Movie } from './movie';

@Injectable()
export class MoviesService {
  private url = 'https://api.themoviedb.org/3/movie/';
  private searchUrl = 'https://api.themoviedb.org/3/search/movie';
  private apiKey = '68b4fe2a513155a58dd0af4adacb281b';
  private language;

  constructor (private http: Http) {
    if (localStorage.getItem('lang') == 'pl') this.language = 'pl';
    else this.language = 'en';
  }

  getMovies(): Observable<Movie[]> {
    let moviesUrl = `${this.url}popular?api_key=${this.apiKey}&language=${this.language}`;

    return this.http.get(moviesUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }

  searchMovies(query: string): Observable<Movie[]> {
    let moviesUrl = `${this.searchUrl}?api_key=${this.apiKey}&language=${this.language}&query=${query}`;

    return this.http.get(moviesUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getDetails(id : number) {
    let detailsUrl = `${this.url}${id}?api_key=${this.apiKey}&language=${this.language}`;

    return this.http.get(detailsUrl)
      .map((res) => { return res.json() })
  }

  changeLanguage(lang: string) {
    localStorage.setItem('lang', lang);
    this.language = lang;
  }

  getLanguage() {
    return this.language;
  }

  private extractData(res: Response) {
    let body = res.json();
    let results = body.results.filter((item)=> item.poster_path !== null);
    return results || { };
  }

  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
