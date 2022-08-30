import { TestBed } from '@angular/core/testing';
import { CommentRoute } from '../models/comment-route';

import { CommentService } from './comment.service';

describe('CommentService', () => {
  let service: CommentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be string in commentRoute', () => {
    let asString = CommentRoute[0];
    expect(asString).toEqual('podcast');
  })
});
