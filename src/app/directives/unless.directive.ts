import {Directive, inject, Input, TemplateRef, ViewContainerRef} from "@angular/core";

@Directive({
  selector: '[unless]',
  standalone: true,
})
export class UnlessDirective {

  private hasView = false;

  templateRef = inject(TemplateRef<any>);
  viewContainerRef = inject(ViewContainerRef);

  @Input() set unless(condition: boolean) {
    if (!condition && !this.hasView) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (condition && this.hasView) {
      this.viewContainerRef.clear();
      this.hasView = false;
    }
  }
}
