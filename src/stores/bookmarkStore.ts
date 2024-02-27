import type BookmarkItem from "$lib/constants/BookmarkItem";
import { writable } from "svelte/store";

// Writable Store for bookmarks
const bookmarkStore = writable<BookmarkItem[]>([]);

export const updatebookmark = (bookmarkItem: BookmarkItem) => {
  const existingItem = bookmarkStore.update((bookmarkItems) => {
    const index = bookmarkItems.findIndex((i) => i.phrase === bookmarkItem.phrase);
    if (index === -1) {
      bookmarkItems.push(bookmarkItem);
    }
    else {
        bookmarkItems.splice(index, 1);
    }
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

export default bookmarkStore