import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommentDtoModel } from '../models/comment-dto-model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private baseUrl = 'v1/comments/';

  constructor(private readonly http: HttpClient) { }

  public writeComment(content: string, id: number, isPodcast: boolean = false): Observable<object> {
    const url = this.baseUrl + isPodcast ? "podcast" : "episode" + "/" + id + "/write";
    return this.http.post(url, content);
  }
}
