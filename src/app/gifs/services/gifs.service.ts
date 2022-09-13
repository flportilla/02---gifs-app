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

  constructor(private http: HttpClient) {
    this._history = JSON.parse(localStorage.getItem('history')!) || []
    this.results = JSON.parse(localStorage.getItem('results')!) || []

  }

  searchGifs(query: string = '') {

    query = query.trim().toLowerCase()

    if (!this._history.includes(query)) {
      this._history.unshift(query)
      this._history = this._history.splice(0, 9)

      localStorage.setItem('history', JSON.stringify(this._history))

    }

    this.http.get<GifsResponse>(`${this.apiUrl}${this.apiKey}&q=${query}&limit=10`)
      .subscribe(res => {
        this.results = res.data
        localStorage.setItem('results', JSON.stringify(res.data))
      })


  }

}
