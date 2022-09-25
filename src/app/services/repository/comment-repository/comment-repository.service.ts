import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { RepositoryService } from 'src/app/services/repository/repository.service';
import { Web3Service } from 'src/app/services/web3/web3.service';
import { CommentDtoModel } from '../../../static-components/comment/models/comment-dto-model';
import { CommentRoute } from '../../../static-components/comment/models/comment-route';

@Injectable({
  providedIn: 'root'
})
export class CommentRepositoryService extends RepositoryService {

  private baseUrl = 'comments/';

  public commentRoute: CommentRoute = CommentRoute.episode;
  public id: BehaviorSubject<number> = new BehaviorSubject(-1);

  public comments: CommentDtoModel[] = [];
  public commentCount: number = 0;

  public currentOffset: number = 0;
  public amount: number = 10;

  constructor(protected override readonly http: HttpClient,
    protected override readonly web3Service: Web3Service,
    protected readonly activatedRoute: ActivatedRoute) {
    super(http, web3Service);

    this.activatedRoute.queryParams.subscribe(params => {
      this.id.next(params['ep']);
    });

    this.id.subscribe(() => {
      this.currentOffset = 0;
      this.readComments().subscribe(res => {
        this.comments = [];
        res.forEach(element => {
          this.comments.push(element);
        });
      });
      this.countComments().subscribe(res => {
        this.commentCount = res;
      })
    })
  }

  //public override post(){  } //TODO

  public writeComment(content: string): Observable<object> {
    const api = this.baseUrl + CommentRoute[this.commentRoute] + "/" + this.id.value + "/write";
    return this.post(api, content);
  }

  public readMoreComments(): void {
    this.readComments().subscribe(res => {
      res.forEach(element => {
        this.comments.push(element);
      });
    })
  }

  public countComments(): Observable<number> {
    const api = this.baseUrl + CommentRoute[this.commentRoute] + "/" + this.id.value + "/count";
    return this.get<number>(api);
  }

  public editComment(comment: string): Observable<CommentDtoModel> {
    const api = this.baseUrl + CommentRoute[this.commentRoute] + "/" + this.id.value + "/edit";
    return this.put<CommentDtoModel>(api, comment);
  }

  public deleteComment(): Observable<boolean> {
    const api = this.baseUrl + CommentRoute[this.commentRoute] + "/" + this.id.value + "/delete";
    return this.delete(api);
  }

  private readComments(): Observable<CommentDtoModel[]> {
    const api = this.baseUrl + CommentRoute[this.commentRoute] + "/" + this.id.value + "/" + this.amount + "/" + this.currentOffset;
    this.currentOffset += this.amount;
    return this.get<object[]>(api);
  }
}
