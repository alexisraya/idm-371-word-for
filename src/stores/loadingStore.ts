import { writable } from "svelte/store";

export const isLoading = writable(false);

export const updateLoading = (loading: boolean) => {
    isLoading.set(loading);
};
