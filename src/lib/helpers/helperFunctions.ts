import { GRADIENTS } from "$lib/constants/gradients";
import bookmarkStore, { updateBookmarkStore } from "../../stores/bookmarkStore";
import { updateRecentSearchStore } from "../../stores/recentSearchStore";

export const removeDuplicates = (data: any[]) => {
    return data.filter((value, index) => data.indexOf(value) === index);
}

export const getGradient = (country: string) => {
    let regionCountry = country.toLowerCase();
    regionCountry = regionCountry.replace(/\s/g, '');
    const countryInfo = GRADIENTS[regionCountry];
    if (countryInfo){
        return (countryInfo.source);
    }
    else{
        return (GRADIENTS.default.source);
    } 
}

export function setLocalStorageItem(key: string, value: string): void {
    window.localStorage.setItem(key, value);
}

export function getLocalStorageItem(key: string): string | null {
    return window.localStorage.getItem(key);
}

export function removeLocalStorageItem(key: string): void {
    window.localStorage.removeItem(key);
}

export const arrayToString = (arr:any[]) => {
    let str = "";
    arr.forEach(element => {
        str += element.toString() + ",";
    });
    str = str.slice(0,-1);
    return str;
}

export const stringToArry = (str: string | null) => {
    if (str === null){return}
    const trimmedStr = str.trim();
    const arr = trimmedStr.split(',');
    const trimmedArr = arr.map(item => item.trim());

    return trimmedArr;
}

export const updateStores = () => {
    updateBookmarkStore();
    updateRecentSearchStore();
}