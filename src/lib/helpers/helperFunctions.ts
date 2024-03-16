import { GRADIENTS } from "$lib/constants/gradients";

export const removeDuplicates = (data: any[]) => {
    return data.filter((value, index) => data.indexOf(value) === index);
}

export const getGradient = (country: string) => {
    let regionCountry = country.toLowerCase();
    regionCountry = regionCountry.replace(/\s/g, '');
    console.log(regionCountry);
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
