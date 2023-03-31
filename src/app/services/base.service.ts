import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  constructor(private httpClient: HttpClient) {}

  public getData(url: string, requestParam?: any): Observable<any> {
    const params = requestParam ? this.generateHttpParam(requestParam) : null;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return this.httpClient.get(url, { params }).pipe(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      map((resp: HttpResponseModel): any => resp)
    );
  }

  public postData(url: string, payload: any): Observable<any> {
    return this.httpClient.post(url, payload).pipe(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      map((resp: HttpResponseModel): any => resp)
    );
  }

  public deleteData(url: string): Observable<any> {
    return this.httpClient.delete(url).pipe(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      map((resp: HttpResponseModel): any => resp)
    );
  }

  public putData(url: string, payload: any): Observable<any> {
    return this.httpClient.put(url, payload).pipe(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      map((resp: HttpResponseModel): any => resp)
    );
  }

  public generateHttpParam(
    param: any,
    isSentAllParams: boolean = false
  ): HttpParams {
    let result = new HttpParams();

    if (param && !isSentAllParams) {
      Object.keys(param).forEach((key) => {
        if (
          param[key] !== null &&
          param[key] !== undefined &&
          param[key] !== ''
        ) {
          if (Array.isArray(param[key])) {
            for (let i in param[key]) {
              result = result.append(key, param[key][i]);
            }
          } else result = result.set(key, param[key]);
        }
      });
    } else {
      if (param)
        Object.keys(param).forEach(
          (key) =>
            (result = result.set(key, param[key] === null ? '' : param[key]))
        );
    }

    return result;
  }

  public getUser() {
    if (localStorage.getItem('user')) {
      const userData = JSON.parse(localStorage.getItem('user') || '');
      return userData;
    }
    return null;
  }

  public isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }

  public logout() {
    localStorage.removeItem('user');
  }
}
