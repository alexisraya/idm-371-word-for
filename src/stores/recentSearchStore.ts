import type SearchItem from "$lib/constants/searchItem";
import { writable } from "svelte/store";

// Writable Store for recent searches
const recentSearchStore = writable<SearchItem[]>([]);

export const updateRecentSearch = (recentSearchItem: SearchItem) => {
  const existingItem = recentSearchStore.update((recentSearchItems) => {
    const index = recentSearchItems.findIndex((i) => i.phrase === recentSearchItem.phrase);
    if (index === -1) {
      recentSearchItems.push(recentSearchItem);
    }
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
  console.log(recentSearchStore)
}

export const deleteRecentStore = () => {
  recentSearchStore.set([]);
}

export default recentSearchStore