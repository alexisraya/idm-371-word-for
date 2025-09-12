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
  const outer = JSON.parse(localFormData);
  const localArr = JSON.parse(outer.value);
  formData.set(localArr.results);
}

export const updateResultData = () => {
  const localResultData = getLocalStorageItem("resultData");
  console.log("LOCAL RESULT DATA");
  console.log(localResultData);
  if (localResultData === null){return}
  const outer = JSON.parse(localResultData);
  console.log("OUTER");
  console.log(outer);
  const localArr = outer.result;
  console.log("LOCAL ARR", localArr);
  resultData.set(localArr);
}
