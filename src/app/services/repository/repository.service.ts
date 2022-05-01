import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { Observable } from 'rxjs';
import { Web3Service } from '../web3/web3.service';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {
  protected static readonly repository_prod = "https://talkaboat.azurewebsites.net/";
  protected static readonly repository_dev = "https://localhost:5001/";
  protected readonly use_dev_repository = false;
  protected static readonly version = "v1/";
  protected jsonHeaders = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('access-control-allow-origin', ['*', 'https://localhost:4200', 'https://talkaboat.online']);

  protected url = RepositoryService.repository_dev + RepositoryService.version;

  constructor(protected readonly http: HttpClient,  protected readonly web3Service: Web3Service) {
    if (!isDevMode() || !this.use_dev_repository) {
      this.url = RepositoryService.repository_prod + RepositoryService.version;
    }
  }

  public post<T>(api: string, body?: any, header?: HttpHeaders, convert: boolean = true): Observable<T> {
    const requestUrl = this.url + api;
    return this.http.post<T>(requestUrl, convert ? JSON.stringify(body) : body, { 'headers': header ? header : this.jsonHeaders });
  }

  public put<T>(api: string, body?: any, header?: HttpHeaders): Observable<T> {
    const requestUrl = this.url + api;
    return this.http.put<T>(requestUrl, JSON.stringify(body), { 'headers': header ? header : this.jsonHeaders });
  }

  public get<T>(api: string, header?: HttpHeaders): Observable<any> {
    const requestUrl = this.url + api;
    return this.http.get<T>(requestUrl, { 'headers': header ? header : this.jsonHeaders });
  }

  public delete(api: string, header?: HttpHeaders): Observable<any> {
    const requestUrl = this.url + api;
    return this.http.get(requestUrl,  { 'headers': header ? header : this.jsonHeaders });
  }
}
