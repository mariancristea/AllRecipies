import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Comment } from '../models';
import { map } from 'rxjs/operators';


@Injectable()
export class CommentsService {
    constructor(
        private apiService: ApiService
    )   {  }

    add(slug, payload) : Observable<Comment> {
        return this.apiService
            .post(`/recipes/${slug}/comments`, { comment: { body: payload } }
            ).pipe(map(data => data.comment));
    }

    getAll(slug): Observable<Comment[]> {
        return this.apiService.get(`/recipes/${slug}/comments`)
            .pipe(map(data =>{console.log('FROMGETALL',data); return data.comments}));
    }
}