import {
  AfterViewChecked,
  ChangeDetectorRef,
  Directive,
  DoCheck,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
  TemplateRef,
  Type,
  ViewContainerRef,
} from '@angular/core';
import { TranslocoDirective, TranslocoService } from '@ngneat/transloco';
import { HashMap } from '@ngneat/transloco/lib/types';

@Directive({
  selector: '[translateDirective]',
})
export class MgmtTranslateDirective implements OnChanges, DoCheck {
  @Input('translateDirective') translateDirective: { key: string; params?: { [key: string]: any } } | undefined ;
  private hasView = false;
  private activeLang: string = '';
  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private translocoService: TranslocoService,
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.['translateDirective']?.currentValue) {
      this.initView(this.translateDirective);
    }
  }

  private initView(input: { key: string; params?: { [p: string]: any } } | undefined) {
    if(input) {
      this.activeLang = this.translocoService?.getActiveLang();
      this.renderer.setProperty(
          this.el.nativeElement,
          'innerText',
          this.translocoService.translate(input.key, input.params, this.activeLang)
      );
    }
  }

  ngDoCheck(): void {
    if (this.translocoService?.getActiveLang() !== this.activeLang) {
      this.initView(this.translateDirective);
    }
  }
}
