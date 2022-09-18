import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RepositoryService } from 'src/app/services/repository/repository.service';
import { Web3Service } from 'src/app/services/web3/web3.service';
import { CommentDtoModel } from '../../../static-components/comment/models/comment-dto-model';
import { CommentRoute } from '../../../static-components/comment/models/comment-route';

@Injectable({
  providedIn: 'root'
})
export class CommentRepositoryService extends RepositoryService {

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

  public countComments(id: number, commentRoute: number = 0): Observable<number> {
    const api = this.baseUrl + CommentRoute[commentRoute] + "/" + id + "/count";
    return this.get<number>(api);
  }

  public editComment(id: number, comment: string, commentRoute: number = 0): Observable<CommentDtoModel> {
    const api = this.baseUrl + CommentRoute[commentRoute] + "/" + id + "/edit";
    return this.put<CommentDtoModel>(api, comment);
  }

  public deleteComment(id: number, commentRoute: number = 0): Observable<boolean> {
    const api = this.baseUrl + CommentRoute[commentRoute] + "/" + id + "/delete";
    return this.delete(api);
  }
}
