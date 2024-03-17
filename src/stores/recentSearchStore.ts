import type SearchItem from "$lib/constants/searchItem";
import { getLocalStorageItem, removeLocalStorageItem, setLocalStorageItem } from "$lib/helpers/helperFunctions";
import { writable } from "svelte/store";

// Writable Store for recent searches
const recentSearchStore = writable<SearchItem[]>([]);

export const updateRecentSearch = (recentSearchItem: SearchItem) => {
  const existingItem = recentSearchStore.update((recentSearchItems) => {
    const index = recentSearchItems.findIndex((i) => i.phrase === recentSearchItem.phrase);
    if (index === -1) {
      recentSearchItems.push(recentSearchItem);
    }
    setLocalStorageItem("recentSearchStore", JSON.stringify(recentSearchItems))
    return recentSearchItems;
  });
}

export const deleteRecentSearchItem = (recentSearchItem: SearchItem) => {
  const existingItem = recentSearchStore.update((recentSearchItems) => {
    const index = recentSearchItems.findIndex((i) => i.phrase === recentSearchItem.phrase);
    if (index !== -1) {
      recentSearchItems.splice(index, 1);
    }
    return recentSearchItems;
  });
}

export const deleteRecentStore = () => {
  recentSearchStore.set([]);
  removeLocalStorageItem("recentSearchStore");
}

export const updateRecentSearchStore = () => {
  const localRecentSearch = getLocalStorageItem("recentSearchStore");
  if (localRecentSearch === null){return}
  const localArr = JSON.parse(localRecentSearch)
  recentSearchStore.set(localArr);
};

export default recentSearchStore