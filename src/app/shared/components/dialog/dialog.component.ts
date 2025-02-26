import { Component, inject, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

export type DialogData = {
  type: 'information' | 'confirmation' | 'input';
  title?: string;
  content?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  inputLabel?: string;
  inputValue?: string;
};

export type DialogResults = {
  callFunctionOnClose: boolean;
  inputValue?: string;
};

// Dialog popup
@Component({
    selector: 'app-dialog',
    template: `
    @if (dialog.title) {
    <h2 mat-dialog-title>{{ dialog.title }}</h2>
    }
    <mat-dialog-content>
      @if (dialog.content) {
      <p>
        {{ dialog.content }}
      </p>
      } @if(dialog.type === 'input') {
      <mat-form-field class="block">
        <mat-label>{{ dialog.inputLabel || 'Input' }}</mat-label>
        <textarea
          matInput
          cdkTextareaAutosize
          cdkAutosizeMinRows="4"
          cdkAutosizeMaxRows="12"
          [(ngModel)]="inputValue"
        ></textarea>
      </mat-form-field>
      }
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button (click)="onCancel()">
        {{ dialog.cancelLabel || 'Close' }}<mat-icon>close</mat-icon>
      </button>

      @if (dialog.confirmLabel){
      <button
        mat-button
        [mat-dialog-close]="{
          callFunctionOnClose: true,
          inputValue: inputValue()
        }"
        cdkFocusInitial
      >
        {{ dialog.confirmLabel }}<mat-icon>check</mat-icon>
      </button>
      }
    </mat-dialog-actions>
  `,
    imports: [
        FormsModule,
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatDialogClose,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
    ]
})
export class DialogComponent {
  readonly dialogRef = inject(MatDialogRef<DialogComponent>);
  readonly dialog = inject<DialogData>(MAT_DIALOG_DATA);
  readonly inputValue = model(this.dialog.inputValue || '');

  onCancel(): void {
    this.dialogRef.close();
  }
}
