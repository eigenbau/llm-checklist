import {
  ChangeDetectionStrategy,
  Component,
  inject,
  TemplateRef,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ChecklistStore } from '../../core/stores/checklist.store';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import {
  DialogComponent,
  DialogData,
  DialogResults,
} from '../../shared/components/dialog/dialog.component';
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ReferencesComponent } from '../../shared/components/references/references.component';
import { CommonModule } from '@angular/common';
import { CsvService } from '../../core/utils/csv.service';

@Component({
  selector: 'app-checklist',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatSlideToggleModule,
    MatExpansionModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatTabsModule,
    MatButtonToggleModule,
    MatCardModule,
    MatDividerModule,
    MatListModule,
    MatTooltipModule,
    ReferencesComponent,
    MatDialogActions,
    MatDialogContent,
    MatDialogClose,
    MatDialogTitle,
  ],
  templateUrl: './checklist.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChecklistComponent {
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);

  readonly store = inject(ChecklistStore);

  readonly csv = inject(CsvService);

  readonly year = new Date().getFullYear();

  criterionTableColumns = ['index', 'criterion', 'eval'];

  setStep(index: number): void {
    this.store.updateActiveExpansionPanel(index);
  }

  nextStep(): void {
    this.store.updateActiveExpansionPanel(
      this.store.activeExpansionPanel() + 1
    );
  }

  prevStep(): void {
    this.store.updateActiveExpansionPanel(
      this.store.activeExpansionPanel() - 1
    );
  }

  onSelectedTabChange(event: MatTabChangeEvent): void {
    this.store.updateActiveLlmChecklist(event.index);
  }

  onToggleChange(index: number): void {
    this.store.updateCriterion(index);
  }

  onUseCaseInput(input: string): void {
    this.store.UpdateUseCase(input);
  }

  onTargetPopulationInput(input: string): void {
    this.store.UpdateTargetPopulation(input);
  }

  onUserInput(input: string): void {
    this.store.UpdateUser(input);
  }

  onLlmNameInput(name: string, llmIndex: number): void {
    this.store.updateLlmName(name, llmIndex);
  }

  onClearForm(): void {
    this.store.resetState();
    this.snackBar.open('Form is cleared!', 'OK', { duration: 2000 });
  }

  openDialog(data: DialogData): void {
    this.dialog.open(DialogComponent, {
      data,
    });
  }

  openChecklistIntroDialog(templateRef: TemplateRef<HTMLElement>) {
    this.dialog
      .open(templateRef, {
        width: '600px',
      })
      .afterClosed()
      .subscribe(() => {
        this.store.updateChecklistIntroDialogSeen();
      });
  }

  openResultIntroDialog(templateRef: TemplateRef<HTMLElement>) {
    this.dialog
      .open(templateRef, {
        width: '600px',
      })
      .afterClosed()
      .subscribe(() => {
        this.store.updateResultIntroDialogSeen();
      });
  }

  openRationaleDialog(data: DialogData, criterionIndex: number): void {
    const dialogRef: MatDialogRef<DialogComponent, DialogResults> =
      this.dialog.open(DialogComponent, {
        data,
        width: '600px',
      });
    dialogRef.afterClosed().subscribe((r) => {
      if (r && r.callFunctionOnClose) {
        const rationale = r.inputValue || '';
        this.store.updateCriterionRationale(criterionIndex, rationale);
      }
    });
  }

  openDeleteDialog(data: DialogData): void {
    const dialogRef: MatDialogRef<DialogComponent, DialogResults> =
      this.dialog.open(DialogComponent, {
        data,
      });
    dialogRef.afterClosed().subscribe((r) => {
      if (r && r.callFunctionOnClose) {
        this.onClearForm();
      }
    });
  }

  onPrint(): void {
    window.print();
  }

  onCSVDownload(): void {
    this.csv.downloadCSV();
  }
}
