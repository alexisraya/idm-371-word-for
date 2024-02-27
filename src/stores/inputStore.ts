import { writable} from "svelte/store";

// Writable Store for Translation Form Data
export const inputData = writable({});

export function resetInputData() {
    inputData.set({});
}

export function updateInputs(
    lang1: string, lang2: string, regions: any[], contexts: any[], phrase: string) {
    
    resetInputData();

    const data = {
        lang1,
        lang2,
        regions,
        contexts,
        phrase
    }

    inputData.set(data);
}
