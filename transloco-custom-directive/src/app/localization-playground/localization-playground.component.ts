import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { NgForm } from '@angular/forms';

enum TranslationMethods {
  TRANSLOCO_DIRECTIVE = 'TRANSLOCO_DIRECTIVE',
  TRANSLOCO_PIPE = 'TRANSLOCO_PIPE',
  TRANSLOCO_ATTRIBUTE_DIRECTIVE = 'TRANSLOCO_ATTRIBUTE_DIRECTIVE',
  MGMT_WRAPPER_DIRECTIVE = 'MGMT_WRAPPER_DIRECTIVE',
}

const LOCAL_STORAGE_LAST_TRANSLATE_OBJ = 'lastTranslateObj';

@Component({
  selector: 'mgmt-localization-playground',
  templateUrl: './localization-playground.component.html',
  styleUrls: ['./localization-playground.component.scss'],
})
export class LocalizationPlaygroundComponent implements OnInit {
  @ViewChild('translateForm', { static: true }) translateForm:
    | NgForm
    | undefined;
  public rows = [];
  public cells = [];
  public TranslationMethods = TranslationMethods;
  public usageExamples = this.getUsageExamples();
  public translateFormValues: {
    methodToUse: TranslationMethods;
    numberOfRows: number;
    numberOfCells: number;
    lang: string;
    multiplier: number;
  };

  constructor(private translocoService: TranslocoService) {
    const lastFormValues = localStorage.getItem(
      LOCAL_STORAGE_LAST_TRANSLATE_OBJ
    );
    this.translateFormValues = lastFormValues
      ? JSON.parse(lastFormValues)
      : {
          methodToUse: TranslationMethods.TRANSLOCO_DIRECTIVE,
          numberOfRows: 50,
          numberOfCells: 50,
          lang: 'en',
          multiplier: 1,
        };
  }

  ngOnInit(): void {
    this.translateForm?.valueChanges?.subscribe(this.initForm.bind(this));
    this.languageChange(this.translateFormValues?.lang);
  }

  public initForm() {
    this.rows = Array.from({ length: this.translateFormValues.numberOfRows });
    this.cells = Array.from({ length: this.translateFormValues.numberOfRows });
    localStorage.setItem(
      LOCAL_STORAGE_LAST_TRANSLATE_OBJ,
      JSON.stringify(this.translateFormValues)
    );
  }

  public languageChange(lang: string) {
    this.translocoService.load(lang).subscribe(() => {
      this.translocoService.setActiveLang(lang);
    });
  }

  private getUsageExamples() {
    return {
      [TranslationMethods.TRANSLOCO_DIRECTIVE]: `
     recommended by Transloco because of performance mostly when changing language
     (1 subscriber for ng-container and in pipe there are 1 subscriber each pipe)    
     <ng-container *transloco="let t">
        <p>{{ t('name', { name: 'Transloco' }) }}</p>
        <p>{{ t('last', { name: 'Last' }) }}</p>
      </ng-container>
    `,

      [TranslationMethods.TRANSLOCO_ATTRIBUTE_DIRECTIVE]: `
     1 subscriber each directive
     <span transloco="alert" [translocoParams]="{ value: dynamic }"></span>
    `,

      [TranslationMethods.TRANSLOCO_PIPE]: `
    1 subscriber each pipe
    <span>{{ 'alert' | transloco: { value: dynamic } }}</span>
    `,

      [TranslationMethods.MGMT_WRAPPER_DIRECTIVE]: `
     each directive uses DoCheck of angular for language change then changing inner text with render
     <span [translateDirective]="{ key: 'threat', params: { number: 2 } }" ></span>
    `,
    };
  }
}
