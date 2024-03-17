import { getLocalStorageItem, setLocalStorageItem } from "$lib/helpers/helperFunctions";
import { writable } from "svelte/store";

export const previousPage = writable();

export const setPreviousPage = (prevPage: string) => {
    previousPage.set(prevPage);
    setLocalStorageItem("previousPage", prevPage);
}

export const updatePreviousPageData = () => {
    const localPrevPageData = getLocalStorageItem("previousPage")
    if (localPrevPageData === null){return}
    previousPage.set(localPrevPageData);
}