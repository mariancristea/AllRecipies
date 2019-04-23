import { Component, Input } from "@angular/core";



@Component({
    selector: 'category-preview',
    templateUrl: './category-preview.component.html',
    styleUrls: ['./category-preview.component.css']
})

export class CategoryPreviewComponent {
    @Input() category: object;
    
    constructor() {}
}