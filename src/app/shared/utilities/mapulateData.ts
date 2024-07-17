export function joinStrings(array: string[], separator: string): string {
    return array?.join(separator);
}

export function splitStrings(array: string, separator: string): string[] {
    return array?.split(separator)?.map((item) => item.trim());
}
export function removeEmptyString(array: string[]) {
    return array?.filter(str => str?.trim() !== "");
}

export function replaceString(text: string, searchValue: string, replaceValue: string) {
    return text?.replace(searchValue, replaceValue);
}

export function getNameByLookups(key: number | string, lookupData: any, id: string = 'id') {
    let displayData = key;
    if (lookupData) {
        displayData = lookupData?.filter((lookup: any) => lookup[id] == displayData)[0]?.name || '';
    }
    return displayData;
}