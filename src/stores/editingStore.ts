import { writable } from "svelte/store";

export const isEditing = writable(false);

export const updateEditing = (editing: boolean) => {
    isEditing.set(editing);
};