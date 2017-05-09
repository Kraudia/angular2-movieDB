export class Movie {
  constructor(
    public poster_path : string,
    public adult : boolean,
    public overview : string,
    public release_date : string,
    public genre_ids : number,
    public id : number,
    public original_title : string,
    public original_language : string,
    public title : string,
    public backdrop_path : string,
    public popularity : number,
    public vote_count : number,
    public video : boolean,
    public vote_average : number) { }
}
