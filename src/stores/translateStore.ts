import { writable } from 'svelte/store';

// Writable Store for Translation Form Data
export const formData = writable({});

// Writable Store for the chosen result
export const resultData = writable({});

export function resetFormData() {
    formData.set({});
  }
