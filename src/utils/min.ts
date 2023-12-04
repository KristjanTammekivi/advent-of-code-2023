export const min = (array: number[]) => {
    // eslint-disable-next-line unicorn/no-array-reduce
    return array.reduce((accumulator, value) => {
        if (Number.isNaN(value)) {
            return accumulator;
        }
        return value < accumulator ? value : accumulator;
    }, Number.POSITIVE_INFINITY);
};

export const minBy = <T>(array: T[], selector: (value: T) => number) => {
    // eslint-disable-next-line unicorn/no-array-reduce
    return array.reduce((accumulator, value) => {
        if (Number.isNaN(selector(value))) {
            return accumulator;
        }
        return selector(value) < selector(accumulator) ? value : accumulator;
    }, array[0]);
};
