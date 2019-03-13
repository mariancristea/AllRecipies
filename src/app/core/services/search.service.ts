import { Injectable } from "@angular/core";
import { ApiService } from './api.service';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import { TreeError } from '@angular/compiler';
import { Recipe, RecipeListConfig } from '../models';
import { HttpParams } from '@angular/common/http';


@Injectable()
export class SearchService {
    queryUrl: string = '?search=';
    searchTerm$ = new BehaviorSubject<String>('');
    listConfig: RecipeListConfig = {
        type: 'all',
        search: false,
        filters: {}
      };
    tags = new BehaviorSubject<RecipeListConfig>(this.listConfig);
   
    Type : String;
    constructor(private apiService: ApiService) {}

    search(terms: Observable<String>) : Observable<{recipes: Recipe[], recipesCount: number}>  {
        console.log('SEARCH START', console.log(terms));
        return terms.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap(val => {
                return this.searchEntries(this.searchTerm$.getValue())
            })
        );
    }

    searchEntries(term) : Observable<{recipes: Recipe[], recipesCount: number}> {
        const params = {};
        const config = this.tags.getValue();
        console.log(config, this.tags.getValue());
        Object.keys(config.filters)
        .forEach((key) => {
            console.log(key);
            params[key] = config.filters[key];
        })
        console.log('params',params);

        console.log('SearchEntries', term)
        return this.apiService
            .get('/recipes' + this.queryUrl + term, new HttpParams({ fromObject: params }))
            .pipe(map(res => res));
    }
}