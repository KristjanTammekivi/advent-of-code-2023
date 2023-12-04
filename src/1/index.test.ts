import { expect } from 'hein';
import { calculateCalibrationValue } from '.';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

describe('1. December', () => {
    it('should pass test case', () => {
        const testData = readFileSync(join(__dirname, 'testdata.txt'), 'utf8');
        const testResult = readFileSync(join(__dirname, 'testresult.txt'), 'utf8');
        expect(calculateCalibrationValue(testData)).to.equal(Number.parseInt(testResult, 10));
    });
    it('should return first number and last number of a line as number', () => {
        const line = '12';
        expect(calculateCalibrationValue(line)).to.equal(12);
    });
    it('should return first number and last number of a line as number if there is text in between', () => {
        const line = '1abc2';
        expect(calculateCalibrationValue(line)).to.equal(12);
    });
    it('should return first number and last number of a line as number if there is text at the start', () => {
        const line = 'abc12';
        expect(calculateCalibrationValue(line)).to.equal(12);
    });
    it('should calculate the word value of the input', () => {
        const line = 'one';
        expect(calculateCalibrationValue(line)).to.equal(11);
    });
});
