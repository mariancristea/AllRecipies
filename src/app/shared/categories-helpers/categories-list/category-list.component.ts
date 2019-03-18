import { Component } from "@angular/core";



@Component({
    selector: 'category-list',
    templateUrl: './category-list.component.html',
    styleUrls: ['./category-list.component.css']
})

export class CategoryList {
    categories: String[] = ['Asian','italian','ttest1','test2','ttest1','test2','ttest1','test2','ttest1','test2','ttest1','test2'];
}