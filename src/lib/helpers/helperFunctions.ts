export const removeDuplicates = (data: any[]) => {
    return data.filter((value, index) => data.indexOf(value) === index);
}