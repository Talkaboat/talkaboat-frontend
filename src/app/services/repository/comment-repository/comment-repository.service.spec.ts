import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { CommentModule } from '../../../static-components/comment/comment.module';
import { CommentRoute } from '../../../static-components/comment/models/comment-route';

import { CommentRepositoryService } from './comment-repository.service';

describe('CommentService', () => {
  let service: CommentRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
        FormsModule,
        CommentModule
      ]
    });
    service = TestBed.inject(CommentRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be string in commentRoute', () => {
    let asString = CommentRoute[0];
    expect(asString).toEqual('podcast');
  })
});
