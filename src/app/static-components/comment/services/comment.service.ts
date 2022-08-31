import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RepositoryService } from 'src/app/services/repository/repository.service';
import { Web3Service } from 'src/app/services/web3/web3.service';
import { CommentDtoModel } from '../models/comment-dto-model';
import { CommentRoute } from '../models/comment-route';

@Injectable({
  providedIn: 'root'
})
export class CommentService extends RepositoryService {

  private baseUrl = 'comments/';

  constructor(protected override readonly http: HttpClient,
    protected override readonly web3Service: Web3Service) {
    super(http, web3Service);
  }

  //public override post(){  } //TODO
  
  public writeComment(content: string, id: number, commentRoute: number = 0): Observable<object> {
    const api = this.baseUrl + CommentRoute[commentRoute] + "/" + id + "/write";
    return this.post(api, content);
  }

  public readComments(id: number, amount: number, offset: number, commentRoute: number = 0): Observable<CommentDtoModel[]> {
    const api = this.baseUrl + CommentRoute[commentRoute] + "/" + id + "/" + amount + "/" + offset;
    return this.get<object[]>(api);
  }
}
