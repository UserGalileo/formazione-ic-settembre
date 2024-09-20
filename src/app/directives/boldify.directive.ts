import {Directive, ElementRef, inject} from "@angular/core";
import {HighlightDirective} from "./highlight.directive";

@Directive({
  selector: '[appBoldify]',
  standalone: true,
  host: {
    '(mouseenter)': `boldify(true)`,
    '(mouseleave)': `boldify(false)`
  }

})
export class BoldifyDirective {

  initialWeight: string | null = null;

  private el = inject(ElementRef);

  ngOnInit() {
    this.initialWeight = this.el.nativeElement.style.fontWeight;
  }

  boldify(condition: boolean) {
    if (condition) {
      this.el.nativeElement.style.fontWeight = 'bold';
    } else {
      this.el.nativeElement.style.fontWeight = this.initialWeight;
    }
  }
}

@Directive({
  selector: '[appHighlightBoldify]',
  standalone: true,
  hostDirectives: [HighlightDirective, BoldifyDirective]
})
export class HighlightAndBoldify {}
