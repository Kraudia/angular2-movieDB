import { Injectable }               from '@angular/core';
import { Http, Response }           from '@angular/http';
import { Observable }               from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Movie } from './movie';

@Injectable()
export class MoviesService {
  private moviesUrl = 'https://api.themoviedb.org/3/movie/popular?api_key=68b4fe2a513155a58dd0af4adacb281b&language=pl&page=1';  // URL to web API

  constructor (private http: Http) {}

  getMovies(): Observable<Movie[]> {
    return this.http.get(this.moviesUrl)
      .map(this.extractData)
      .catch(this.handleError);
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
