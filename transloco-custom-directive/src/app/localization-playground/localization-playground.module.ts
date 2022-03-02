import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { localizationPlaygroundRoutes } from './Localization-playground.route';
import { MgmtTranslateDirective } from './mgmt-translate.directive';
import { LocalizationPlaygroundComponent } from './localization-playground.component';
import { TranslocoModule } from '@ngneat/transloco';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [MgmtTranslateDirective, LocalizationPlaygroundComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    RouterModule.forChild(localizationPlaygroundRoutes),
    FormsModule,
    TranslocoModule,
    MatCardModule,
  ],
})
export class LocalizationPlaygroundModule {}
