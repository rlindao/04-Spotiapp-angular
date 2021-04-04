import { Injectable } from '@angular/core';
import {HttpClient , HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) {
      console.log('Spotify service listo');
  }

  getQuery( query: string) {
     const url = `https://api.spotify.com/v1/${query}`;

     const headers = new HttpHeaders({
      Authorization: 'Bearer BQC2NIDoEzxxHMEOS1_rowd_MRre4sZLv17_L4tKrRJMFQkBSgPSp92iQAiUaGtazpWQud4oc26f1aK4ybo'
      });

      return this.http.get(url , { headers });
  }

  getNewReleases(){
    return this.getQuery('browse/new-releases')
               .pipe( map( data => {
                      return data['albums'].items;
                }) ) ;

  }

  getArtistas(termino: string){
    return this.getQuery(`search?q=${termino}&type=artist`)
               .pipe( map ( data => {
                  return data['artists'].items;
                }));

  }


  getArtista(id: string){
    return this.getQuery(`artists/${id}`);

  }


  getTopTracks(id: string){
    return this.getQuery(`artists/${id}/top-tracks?country=us`)
               .pipe( map (data => data['tracks']));

  }



}
