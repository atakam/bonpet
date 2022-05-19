export function intToString (value) {
    var suffixes = ["", "K", "M", "B","T"];
    var suffixNum = Math.floor((""+value).length/3);
    var shortValue = parseFloat((suffixNum != 0 ? (value / Math.pow(1000,suffixNum)) : value).toPrecision(2));
    if (shortValue % 1 != 0) {
        shortValue = shortValue.toFixed(2);
    }
    return shortValue+suffixes[suffixNum] + ' TSh';
};

export function formatMoney(n) {
    return (Math.round(n * 100) / 100).toLocaleString() + ' TSh';
}