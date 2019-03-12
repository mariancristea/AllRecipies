import { Injectable } from "@angular/core";
import { ApiService } from './api.service';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import { TreeError } from '@angular/compiler';


@Injectable()
export class SearchService {
    queryUrl: string = '?search=';
    searchTerm$ = new BehaviorSubject<String>('');
    Type : String;
    constructor(private apiService: ApiService) {}

    search(terms: Observable<String>) {
        console.log('SEARCH START', console.log(terms));
        return terms.pipe(
            debounceTime(1000),
            distinctUntilChanged(),
            switchMap(val => {
                return this.searchEntries(this.searchTerm$.getValue())
            })
        );
    }

    searchEntries(term){
        console.log('SearchEntries', term)
        return this.apiService
            .get('/recipes' + this.queryUrl + term)
            .pipe(map(res => res));
    }
}