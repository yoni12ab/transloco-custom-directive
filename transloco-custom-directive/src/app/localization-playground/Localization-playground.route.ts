import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LocalizationPlaygroundComponent} from "./localization-playground.component";

export const localizationPlaygroundRoutes: Routes = [
  { path: '', component: LocalizationPlaygroundComponent, children: [] },
];
