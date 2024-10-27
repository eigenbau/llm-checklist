import { inject, Injectable } from '@angular/core';
import { ChecklistStore } from '../stores/checklist.store';

@Injectable({
  providedIn: 'root',
})
export class CsvService {
  readonly store = inject(ChecklistStore);

  downloadCSV(): void {
    const filename = 'llm-screener-results.csv';
    const csvData = this.convertToCSV();
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', filename);
    a.click();

    window.URL.revokeObjectURL(url); // Clean up the URL object
  }

  private convertToCSV(): string {
    const titleSection = [
      `, USE CASE: ${this.esc(this.store.useCase())}`,
      `, PATIENT POPULATION: ${this.esc(this.store.targetPopulation())}`,
      `, END-USER GROUP(S): ${this.esc(this.store.user())}`,
      '\n',
    ].join('\n');

    const headerOne =
      ',,,' +
      this.store
        .llmList()
        .map((l, i) => (l.name ? this.esc(l.name) : `LLM ${i + 1}`))
        .join(',,') +
      '\n'; // empty, empty, empty, array of [llm name, empty]

    const headerTwo =
      '#,Criterion,Required,' +
      this.store
        .llmList()
        .map(() => 'Criterion met,Rationale')
        .join(',') +
      '\n'; // #, Criterion, Required, array of [Criterion met, Rationale]

    const rows = this.store
      .criterionList()
      .map((c, i) =>
        [
          [i + 1, this.esc(c.question), c.required].join(','), // Criterion number, Criterion, Required flag
          this.store.llmList().map(
            (l) =>
              [
                l.answerList[i].criterionMet ? 'yes' : 'no / unsure',
                this.esc(l.answerList[i].rationale),
              ].join(',') // array of [Yes OR no / unsure, Answer rationale]
          ),
        ].join(',')
      )
      .join('\n');

    return titleSection + headerOne + headerTwo + rows;
  }

  private esc(value: unknown): string {
    const stringValue =
      value === null || value === undefined ? '' : value.toString();

    // Wrap in double quotes if there’s a comma, double quote, or newline
    if (/[,"\n]/.test(stringValue)) {
      return `"${stringValue.replace(/"/g, '""')}"`; // Escape double quotes by doubling them
    }
    return stringValue;
  }
}
