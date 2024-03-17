import type BookmarkItem from "$lib/constants/bookmarkItem";
import { getLocalStorageItem, setLocalStorageItem } from "$lib/helpers/helperFunctions";
import { writable } from "svelte/store";

const initialBookmarks: BookmarkItem[] = [];
// Writable Store for bookmarks
const bookmarkStore = writable(initialBookmarks);

export const updateBookmark = (bookmarkItem: BookmarkItem) => {
  bookmarkStore.update((bookmarkItems) => {
    const index = bookmarkItems.findIndex((i) => i.phrase === bookmarkItem.phrase);
    console.log(bookmarkItem);
    if (index === -1) {
      bookmarkItems.push(bookmarkItem);
    }
    else {
        bookmarkItems.splice(index, 1);
    }
    console.log(JSON.stringify(bookmarkItems))
    setLocalStorageItem("bookmarkStore", JSON.stringify(bookmarkItems));
    return bookmarkItems;
  });
}

export const isBookmarked = (bookmarkItem: BookmarkItem) => {
    let isInStore = false;
    bookmarkStore.update((bookmarkItems) => {
      const index = bookmarkItems.findIndex((i) => i.phrase === bookmarkItem.phrase);
      if (index === -1) {
        isInStore = false;
      }
      else {
          isInStore = true;
      }
      setLocalStorageItem("bookmarkStore", JSON.stringify(bookmarkItems));
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