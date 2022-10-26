import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cat, CatsApiResponse, ICat } from './cats-response.interface';

@Injectable({
  providedIn: 'root',
})
export class CatsApiService {
  private _catsApiUrl: string = environment.cats_api_url;

  constructor(private _httpClient: HttpClient) {}

  public createCat(
    name: string,
    age: number,
    description: string
  ): Observable<ICat> {
    let body = {
      name: name,
      age: age,
      description: description,
    };

    let response = this._httpClient.post<ICat>(
      `${this._catsApiUrl}/create`,
      body
    );

    return response;
  }

  public updateCat(
    id: string,
    name: string,
    age: number,
    description: string
  ): Observable<Cat> {
    let body = {
      name: name,
      age: age,
      description: description,
    };

    let response = this._httpClient.put<Cat>(
      `${this._catsApiUrl}/update`,
      body,
      {
        params: { id: id },
      }
    );

    return response;
  }

  public listCats(id?: string | string[]): Observable<CatsApiResponse> {
    let params = {};

    if (typeof id == 'string') {
      params['id'] = id;
    } else if (typeof id == 'object') {
      params['id'] = id.join(',');
    }

    let response = this._httpClient.get<CatsApiResponse>(
      `${environment.cats_api_url}/list`,
      {
        params: params,
      }
    );

    return response;
  }

  public deleteCat(id: string): Observable<any> {
    return this._httpClient.delete(`${this._catsApiUrl}/delete`, {
      params: { id: id },
    });
  }
}
