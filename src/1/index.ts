import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { minBy } from '../utils/min';
import { maxBy } from '../utils/max';

const wordsToValues = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9
};

export const calculateCalibrationValue = (value: string) => {
    return value
        .split('\n')
        .filter(Boolean)
        .reduce((accumulator, line) => accumulator + calculateLine(line), 0);
};

const validSeachStrings = [...Object.keys(wordsToValues), ...Object.values(wordsToValues).map(String)];

const calculateLine = (line: string) => {
    const firstIndexesWithStrings = validSeachStrings
        .map((searchString) => ({
            searchString,
            index: line.indexOf(searchString)
        }))
        .filter((x) => x.index !== -1);
    const firstString = minBy(firstIndexesWithStrings, (x) => x.index);
    const firstNumber =
        wordsToValues[firstString.searchString as keyof typeof wordsToValues] ?? firstString.searchString;
    const lastIndexesWithStrings = validSeachStrings
        .map((searchString) => ({
            searchString,
            index: line.lastIndexOf(searchString)
        }))
        .filter((x) => x.index !== -1);
    const lastString = maxBy(lastIndexesWithStrings, (x) => x.index);
    const lastNumber = wordsToValues[lastString.searchString as keyof typeof wordsToValues] ?? lastString.searchString;
    return Number.parseInt(`${ firstNumber }${ lastNumber }`, 10);
};

if (require.main === module) {
    const input = readFileSync(join(__dirname, 'input.txt'), 'utf8');
    console.log(calculateCalibrationValue(input));
}
