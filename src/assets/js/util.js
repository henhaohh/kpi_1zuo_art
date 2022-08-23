function checkTimestamp(s) {
    if (String(s).length === 10) {
        return Number(s) * 1e3
    }
    return Number(s)
}
export {
    checkTimestamp
}