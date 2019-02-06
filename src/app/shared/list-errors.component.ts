import { Component, Input } from '@angular/core';
import { Errors } from '../core';


@Component({
    selector: 'app-list-errors',
    templateUrl: './list-errors.component.html'
})

export class ListErrorsComponent {
    formattedErrors: Array<string> = [];

    @Input()
    set errors(errorList : Errors) {
        console.log('BAU:::',errorList.error.errors);
        this.formattedErrors = Object.keys(errorList.error.errors || {})
            .map(key => { console.log(key);
                return `${key + ' '}${errorList.error.errors[key]}`
            });
        console.log('ERR:::',this.formattedErrors);


    }

    get errorList() { return this.formattedErrors; }
}