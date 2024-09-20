import {Directive, ElementRef, inject, Input} from "@angular/core";

@Directive({
  selector: '[appHighlight]',
  standalone: true,
  host: {
    '(mouseenter)': `highlight('yellow')`,
    '(mouseleave)': `highlight('')`
  }
})
export class HighlightDirective {

  private el = inject(ElementRef);

  // @Input({ alias: 'appHighlight' }) color = '';

  highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
