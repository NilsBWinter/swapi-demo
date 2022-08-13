export function extractIdFromSWAPIUrl(url: string): number {
    const array = url.split('/');
    return parseInt(array[array.length - 2], 10);
}