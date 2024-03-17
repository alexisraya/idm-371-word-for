import type BookmarkItem from "$lib/constants/BookmarkItem";
import { arrayToString, getLocalStorageItem, setLocalStorageItem, stringToArry } from "$lib/helpers/helperFunctions";
import { writable } from "svelte/store";

// Writable Store for bookmarks
const bookmarkStore = writable<BookmarkItem[]>([]);

export const updatebookmark = (bookmarkItem: BookmarkItem) => {
  const existingItem = bookmarkStore.update((bookmarkItems) => {
    const index = bookmarkItems.findIndex((i) => i.phrase === bookmarkItem.phrase);
    // let localStorageArr: string[] = [];
    if (index === -1) {
      bookmarkItems.push(bookmarkItem);
      // const item = JSON.stringify(bookmarkItem);
      // localStorageArr.push(item);
    }
    else {
        bookmarkItems.splice(index, 1);
        // localStorageArr.splice(index, 1);
    }
    setLocalStorageItem("bookmarkStore", JSON.stringify(bookmarkItems));
    return bookmarkItems;
  });
}

export const isBookmarked = (bookmarkItem: BookmarkItem) => {
    let isInStore = false;
    const existingItem = bookmarkStore.update((bookmarkItems) => {
      const index = bookmarkItems.findIndex((i) => i.phrase === bookmarkItem.phrase);
      if (index === -1) {
        isInStore = false;
      }
      else {
          isInStore = true;
      }
      return bookmarkItems;
    });
    return (isInStore);
};

export const updateBookmarkStore = () => {
  const localBookmarks = getLocalStorageItem("bookmarkStore");
  if (localBookmarks === null){return}
  const localArr = JSON.parse(localBookmarks)
  bookmarkStore.set(localArr);
};

export default bookmarkStore