import { getLocalStorageItem, removeLocalStorageItem } from '$lib/helpers/helperFunctions';
import { writable } from 'svelte/store';

// Writable Store for Translation Form Data
export const formData = writable({});

// Writable Store for the chosen result
export const resultData = writable({});

export const resetFormData = () => {
    formData.set({});
    removeLocalStorageItem("formData");
}

export const updateFormData = () => {
  const localFormData = getLocalStorageItem("formData");
  if (localFormData === null){return}
  const localArr = JSON.parse(localFormData)
  formData.set(localArr);
}

export const updateResultData = () => {
  const localResultData = getLocalStorageItem("resultData");
  if (localResultData === null){return}
  const localArr = JSON.parse(localResultData)
  formData.set(localArr);
}
