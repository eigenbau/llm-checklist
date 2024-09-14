import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  {
    path: 'welcome',
    loadComponent: () =>
      import('./modules/welcome/welcome.component').then(
        (m) => m.WelcomeComponent
      ),
  },
  {
    path: 'checklist',
    loadComponent: () =>
      import('./modules/checklist/checklist.component').then(
        (m) => m.ChecklistComponent
      ),
  },
  { path: '**', redirectTo: 'welcome' },
];
