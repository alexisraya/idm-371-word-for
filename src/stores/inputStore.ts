import { getLocalStorageItem, removeLocalStorageItem, setLocalStorageItem } from "$lib/helpers/helperFunctions";
import { writable} from "svelte/store";

// Writable Store for Translation Form Data
export const inputData = writable({});

export function resetInputData() {
    inputData.set({});
    removeLocalStorageItem("inputData");
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
    setLocalStorageItem("inputData", JSON.stringify(data))
    inputData.set(data);
}

export const updateInputData = () => {
    const localInputData = getLocalStorageItem("inputData");
    if (localInputData === null){return}
    const localArr = JSON.parse(localInputData)
    inputData.set(localArr);
};
