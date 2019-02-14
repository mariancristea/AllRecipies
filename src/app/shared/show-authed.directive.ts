import { OnInit, Directive, ViewContainerRef, TemplateRef, Input } from '@angular/core';
import { UserService } from '../core';


@Directive({selector : '[appShowAuthed]'})
export class ShowAuthedDirective implements OnInit{
    constructor(
        private userService : UserService,
        private templateRef : TemplateRef<any>,
        private viewContainer : ViewContainerRef
    ) {}
    
    condition : boolean;
    
    ngOnInit() {
        console.log('TTTTTTTT');
       // this.viewContainer.createEmbeddedView(this.templateRef)
        this.userService.isAuthenticated.subscribe(
            (isAuthenticated) => {
                console.log('PAS');
                if(isAuthenticated && this.condition || !isAuthenticated && !this.condition) {
                    this.viewContainer.createEmbeddedView(this.templateRef)
                }   else {
                    this.viewContainer.clear();
                }
            }
        );
    }

   @Input() set appShowAuthed(condition: boolean) {
       console.log('Start',condition);
        this.condition = condition;
      }
}