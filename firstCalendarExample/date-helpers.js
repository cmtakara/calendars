function isWeekend (day) {
    return (day % 7 === 0 || day % 7 === 6);
}

export {isWeekend}