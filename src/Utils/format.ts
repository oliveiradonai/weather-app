export function formatString(prop: any) {
    const textOut = prop.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

    return textOut;
}