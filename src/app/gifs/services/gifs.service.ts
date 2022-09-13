import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, GifsResponse } from 'src/app/gifs/interfaces/gifsResponse';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiUrl: string = 'https://api.giphy.com/v1/gifs/search?api_key='
  private apiKey: string = '1vR17fUGqB05RUdCT1fW2W0JdrDbFGtY';
  private _history: string[] = [];
  public results: Gif[] = []

  get history() {
    return [...this._history]
  }

  constructor(private http: HttpClient) { }

  searchGifs(query: string = '') {

    query = query.trim().toLowerCase()

    if (!this._history.includes(query)) {
      this._history.unshift(query)
      this._history = this._history.splice(0, 9)
    }

    this.http.get<GifsResponse>(`${this.apiUrl}${this.apiKey}&q=${query}&limit=10`)
      .subscribe(res => {
        this.results = res.data
      })


  }

}
