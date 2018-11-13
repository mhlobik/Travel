export function humanizeDataSize(value: number, inputUnit?: 'Bytes' | 'KB' | 'MB') {
    let bytes: number;
    if (inputUnit) {
        switch (inputUnit) {
            case 'Bytes':
                bytes = value;
                break;
            case 'KB':
                bytes = value * 1024;
                break;
            case 'MB':
                bytes = value * 1024 * 1024;
        }
    } else {
        bytes = value;
    }

    if (bytes === 0) {
        return '0 KB';
    } else if (bytes < 1024 * 10) {
        return (bytes / 1024).toFixed(2) + ' KB';
    } else if (bytes < 1024 * 100) {
        return Math.floor(bytes / 1024) + ' KB';
    } else if (bytes < 1024 * 1024 * 10) {
        return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
    } else if (bytes < 1024 * 1024 * 1024) {
        return Math.floor(bytes / (1024 * 1024)) + ' MB';
    } else {
        return (bytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
    }
}

export function isDictionaryEmpty(dict: any) {
    if (typeof dict !== 'object') {
        throw Error('Dictionary must be javascript object!');
    }
    return Object.keys(dict).length === 0;
}

export function caseInsensitiveStringSort(first: string, second: string) {
    const s1 = first.toLowerCase();
    const s2 = second.toLowerCase();
    return s1 < s2 ? -1 : s1 > s2 ? 1 : 0;
}
