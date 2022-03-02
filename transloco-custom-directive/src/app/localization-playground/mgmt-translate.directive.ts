import {
  Directive,
  DoCheck,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

@Directive({
  selector: '[translateDirective]',
})
export class MgmtTranslateDirective implements OnChanges, DoCheck {
  @Input('translateDirective') translateDirective:
    | { key: string; params?: { [key: string]: any } }
    | undefined;
  private activeLang: string = '';
  private lastTranslatedText = '';
  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private translocoService: TranslocoService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.['translateDirective']?.currentValue) {
      this.initView(this.translateDirective);
    }
  }

  private initView(
    input: { key: string; params?: { [p: string]: any } } | undefined
  ) {
    if (input) {
      this.activeLang = this.translocoService?.getActiveLang();
      const translatedText = this.translocoService.translate(
        input.key,
        input.params,
        this.activeLang
      );

      if (this.lastTranslatedText !== translatedText) {
        this.lastTranslatedText = translatedText;
        this.renderer.setProperty(
          this.el.nativeElement,
          'innerText',
          translatedText
        );
      }
    }
  }

  ngDoCheck(): void {
    if (this.translocoService?.getActiveLang() !== this.activeLang) {
      this.initView(this.translateDirective);
    }
  }
}
