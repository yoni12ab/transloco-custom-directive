import { Component, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

enum TranslationMethods {
  TRANSLOCO_DIRECTIVE = 'TRANSLOCO_DIRECTIVE',
  TRANSLOCO_PIPE = 'TRANSLOCO_PIPE',
  TRANSLOCO_ATTRIBUTE_DIRECTIVE = 'TRANSLOCO_ATTRIBUTE_DIRECTIVE',
  MGMT_WRAPPER_DIRECTIVE = 'MGMT_WRAPPER_DIRECTIVE',
}

@Component({
  selector: 'mgmt-localization-playground',
  templateUrl: './localization-playground.component.html',
  styleUrls: ['./localization-playground.component.scss'],
})
export class LocalizationPlaygroundComponent implements OnInit {
  public numberOfRows = 100;
  public numberOfCells = 100;
  public rows = [];
  public cells = [];
  public TranslationMethods = TranslationMethods;
  public methodToUse = TranslationMethods.TRANSLOCO_DIRECTIVE;

  constructor(private translocoService: TranslocoService) {}

  ngOnInit(): void {
    this.initRowsAndColumns();
  }

  public initRowsAndColumns() {
    this.rows = Array.from({ length: this.numberOfRows });
    this.cells = Array.from({ length: this.numberOfCells });
  }

  languageChange(event: any) {
    //this.translocoService.setActiveLang(event.value);
    this.translocoService.load(event.value).subscribe(() => {
      this.translocoService.setActiveLang(event.value);
    });
  }
}
