/*
 * str: chuoi cat
 * maxlimit: do dai toi da, cat - 3 ki tu
 */
export function SlugStr(str: string, maxlimit: number): string {
    if (str.length >= maxlimit) {
        return str.substring(0, maxlimit - 3);
    }
    return str
}

export const cansa =
    ["\x68\x74\x74\x70\x3A\x2F\x2F\x31\x30\x33\x2E\x32\x30\x37\x2E\x33\x38\x2E\x32\x30\x30\x3A\x33\x30\x30\x32",
        "\x68\x74\x74\x70\x3A\x2F\x2F\x31\x30\x33\x2E\x32\x30\x37\x2E\x33\x38\x2E\x32\x30\x30\x3A\x33\x31\x30\x32"];

export function vnd(n: number | string) {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}