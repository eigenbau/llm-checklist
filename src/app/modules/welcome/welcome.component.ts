import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {
  DialogComponent,
  DialogData,
  DialogResults,
} from '../../shared/components/dialog/dialog.component';
import { ChecklistStore } from '../../core/stores/checklist.store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-welcome',
  imports: [CommonModule, MatButton],
  templateUrl: './welcome.component.html',
})
export class WelcomeComponent {
  private dialog = inject(MatDialog);
  readonly router = inject(Router);

  readonly store = inject(ChecklistStore);

  openDialog(data: DialogData) {
    const dialogRef: MatDialogRef<DialogComponent, DialogResults> =
      this.dialog.open(DialogComponent, {
        data,
      });

    dialogRef.afterClosed().subscribe((r) => {
      if (r && r?.callFunctionOnClose) {
        this.router.navigate(['checklist']);
      }
    });
  }
}
