import { writable } from 'svelte/store';

// Create a writable store
export const formData = writable({});

export function resetFormData() {
    formData.set({});
  }