import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommentDtoModel } from '../models/comment-dto-model';
import { CommentRoute } from '../models/comment-route';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private baseUrl = 'v1/comments/';

  constructor(private readonly http: HttpClient) { }

  public writeComment(content: string, id: number, commentRoute: number = 0): Observable<object> {
    const url = this.baseUrl + CommentRoute[commentRoute] + "/" + id + "/write";
    return this.http.post(url, content);
  }
}
