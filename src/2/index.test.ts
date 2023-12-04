import { expect } from 'hein';
import { calculateMinimums, calculatePossibleGames as calculatePossibleGames } from '.';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

describe('2. December', () => {
    it('should calculate possible games', () => {
        const testData = readFileSync(join(__dirname, 'testdata.txt'), 'utf8');
        const testResult = readFileSync(join(__dirname, 'testresult.txt'), 'utf8');
        expect(calculatePossibleGames(testData)).to.equal(Number.parseInt(testResult, 10));
    });
    it('should calculate minimums', () => {
        const testData = readFileSync(join(__dirname, 'testdata.txt'), 'utf8');
        const testResult = readFileSync(join(__dirname, 'part2result.txt'), 'utf8');
        expect(calculateMinimums(testData)).to.equal(Number.parseInt(testResult, 10));
    });
});
