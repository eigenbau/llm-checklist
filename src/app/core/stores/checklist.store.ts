/*
The app architecture is built around the store and state pattern found here:
https://ngrx.io/guide/signals/signal-store
*/

import { computed } from '@angular/core';
import { CRITERION_LIST } from '../config/criteria.constants';
import {
  getState,
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';

export type Criterion = {
  question: string;
  required: boolean;
  questionRationale?: string;
};

type Answer = {
  criterionMet: boolean;
  rationale: string;
};

type Llm = {
  name: string;
  answerList: Answer[];
};

type ChecklistState = {
  version: string;
  date: string;
  useCase: string;
  targetPopulation: string;
  user: string;
  activeExpansionPanel: number;
  activeLlmChecklist: number;
  maxLlmListLength: number;
  criterionList: Criterion[];
  llmList: Llm[];
  checklistIntroDialogSeen: boolean;
  resultIntroDialogSeen: boolean;
};

const initialState: ChecklistState = {
  version: '0.9.2',
  date: '2025-02-07',
  useCase: '',
  targetPopulation: '',
  user: '',
  activeExpansionPanel: -1,
  activeLlmChecklist: -1,
  maxLlmListLength: 3,
  criterionList: CRITERION_LIST,
  llmList: [],
  checklistIntroDialogSeen: false,
  resultIntroDialogSeen: false,
};

export const ChecklistStore = signalStore(
  { providedIn: 'root' },

  withState(initialState),

  withComputed(({ llmList, activeLlmChecklist, criterionList }) => ({
    tableData: computed(() => {
      if (llmList().length === 0 || activeLlmChecklist() === -1) {
        return [];
      }
      return criterionList().map((c, i) => ({
        index: i,
        question: c.question,
        questionRationale: c.questionRationale,
        required: c.required,
        firstInGroup:
          i == 0 ? true : c.required !== criterionList()[i - 1].required,
        criterionMet:
          llmList()[activeLlmChecklist()].answerList[i].criterionMet,
        answerRationale:
          llmList()[activeLlmChecklist()].answerList[i].rationale,
      }));
    }),

    results: computed(() => {
      if (llmList().length === 0) {
        return [];
      }
      return llmList().map((l) => ({
        name: l.name,
        totalCriteriaMet: l.answerList.filter((a) => a.criterionMet).length,
        totalRequiredCriteriaMet: l.answerList.filter(
          (a, i) => a.criterionMet && criterionList()[i].required
        ).length,
      }));
    }),

    criteriaCount: computed(() => ({
      total: criterionList().length,
      totalRequired: criterionList().filter((c) => c.required).length,
    })),
  })),

  withMethods((store) => ({
    // Reset state
    resetState(): void {
      patchState(store, () => ({ ...initialState }));
    },

    // Update use case
    UpdateUseCase(useCase: string): void {
      patchState(store, () => ({ useCase }));
    },

    // Update use case
    UpdateTargetPopulation(targetPopulation: string): void {
      patchState(store, () => ({ targetPopulation }));
    },

    // Update user
    UpdateUser(user: string): void {
      patchState(store, () => ({ user }));
    },

    // Update active expansion panel
    updateActiveExpansionPanel(index: number): void {
      patchState(store, () => ({ activeExpansionPanel: index }));
    },

    // Set checklistIntroDialogSeen to true
    updateChecklistIntroDialogSeen(): void {
      patchState(store, () => ({ checklistIntroDialogSeen: true }));
    },

    // Set resultIntroDialogSeen to true
    updateResultIntroDialogSeen(): void {
      patchState(store, () => ({ resultIntroDialogSeen: true }));
    },

    // Add LLM
    addLlm(): void {
      // Add LLM if max list length is not reached
      if (store.llmList().length === store.maxLlmListLength()) {
        return;
      }
      // Activate first list if none is currently active
      if (store.activeLlmChecklist() === -1) {
        patchState(store, (state) => ({ activeLlmChecklist: 0 }));
      }
      patchState(store, (state) => ({
        llmList: [
          ...state.llmList,
          {
            name: '',
            answerList: state.criterionList.map((c) => ({
              criterionMet: false,
              rationale: '',
            })),
          },
        ],
      }));
    },

    // Remove LLM
    removeLlm(): void {
      if (store.llmList().length === 0) {
        return;
      }
      // Adjust active LLM to an existing one, if the currently active one is about to be removed
      if (store.activeLlmChecklist() === store.llmList().length - 1) {
        patchState(store, (state) => ({
          activeLlmChecklist: state.activeLlmChecklist - 1,
        }));
      }
      patchState(store, (state) => ({ llmList: state.llmList.slice(0, -1) }));
    },

    // Update active LLM checklist
    updateActiveLlmChecklist(index: number): void {
      patchState(store, () => ({ activeLlmChecklist: index }));
    },

    // Update LLM name
    updateLlmName(name: string, index: number): void {
      patchState(store, (state) => {
        const llmList = [...state.llmList];
        llmList[index].name = name;
        return { llmList };
      });
    },

    // Update criterion
    updateCriterion(criterionIndex: number): void {
      patchState(store, (state) => {
        const llmList = [...state.llmList];
        llmList[state.activeLlmChecklist].answerList[
          criterionIndex
        ].criterionMet =
          !llmList[state.activeLlmChecklist].answerList[criterionIndex]
            .criterionMet;
        return { llmList };
      });
    },

    // Update criterion
    updateCriterionRationale(criterionIndex: number, rationale: string): void {
      patchState(store, (state) => {
        const llmList = [...state.llmList];
        llmList[state.activeLlmChecklist].answerList[criterionIndex].rationale =
          rationale;
        return { llmList };
      });
    },
  })),

  withHooks((store) => {
    const saveStateToLocalStorage = () => {
      localStorage.setItem('checklistState', JSON.stringify(getState(store)));
      console.log('saved state to local strorage');
    };

    // Helper function to load state from local storage
    const loadStateFromLocalStorage = (): ChecklistState | null => {
      const savedState = localStorage.getItem('checklistState');
      return savedState ? JSON.parse(savedState) : null;
    };

    const removeLocalStorageEntry = () => {
      try {
        // Attempt to remove the item from localStorage
        localStorage.removeItem('checklistState');
        console.log('LocalStorage entry removed.');
      } catch (error) {
        // Handle any errors that occur
        console.error('Error removing LocalStorage entry:', error);
      }
    };

    return {
      onInit() {
        const localState = loadStateFromLocalStorage();

        // Remove existing local state if it has a version mismatch
        if (localState && localState.version !== store.version()) {
          window.alert(
            `Unfortunately the current version of the LLM Screener does not match your saved version. I had to reset the forms. You will have to start over :-(`
          );
          removeLocalStorageEntry();
          patchState(store, () => ({ ...initialState }));
        }

        // Patch state if local state exists and has same version
        if (localState && localState.version === store.version()) {
          patchState(store, () => ({
            ...localState,
            criterionList: initialState.criterionList,
          }));
        }

        // Save state before the user navigates away
        window.addEventListener('visibilitychange', saveStateToLocalStorage);
      },

      onDestroy() {
        saveStateToLocalStorage();
        window.removeEventListener('visibilitychange', saveStateToLocalStorage);
      },
    };
  })
);
