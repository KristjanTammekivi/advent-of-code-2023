import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { max } from '../utils/max';
import { sum } from '../utils/sum';

type Color = 'red' | 'green' | 'blue';

const maximums: Record<Color, number> = {
    red: 12,
    green: 13,
    blue: 14
};

interface Game {
    gameNumber: number;
    rounds: { count: number; colorName: Color }[][];
}

const parseGame = (game: string): Game => {
    const [gameNumberString, ...rest] = game.split(':');
    const gameNumber = Number(gameNumberString.replace('Game ', ''));
    const rounds = rest
        .join(',')
        .split(';')
        .map((round) =>
            round.split(',').map((color) => {
                const [, count, colorName] = color.match(/(\d+) (\w+)/) ?? [];
                return { count: Number(count), colorName: colorName as Color };
            })
        );
    return { gameNumber, rounds };
};

export const calculatePossibleGames = (value: string) => {
    return sum(
        value
            .split('\n')
            .map((game) => parseGame(game))
            .map(({ gameNumber, rounds }) => {
                rounds = rounds.filter((x) => !isRoundValid(x));
                if (rounds.length > 0) {
                    return 0;
                }
                return gameNumber;
            })
    );
};

export const calculateMinimums = (value: string) => {
    const games = value.split('\n').map((game) => parseGame(game));
    return sum(
        games.map(({ rounds }) => {
            const maxReds = max(rounds.map((round) => round.find((x) => x.colorName === 'red')?.count ?? 0));
            const maxGreens = max(rounds.map((round) => round.find((x) => x.colorName === 'green')?.count ?? 0));
            const maxBlues = max(rounds.map((round) => round.find((x) => x.colorName === 'blue')?.count ?? 0));
            return maxReds * maxGreens * maxBlues;
        })
    );
};

const isRoundValid = (round: { count: number; colorName: Color }[]) => {
    return round.every((x) => x.count <= maximums[x.colorName]);
};

if (require.main === module) {
    const input = readFileSync(join(__dirname, 'input.txt'), 'utf8');
    console.log('Possible games:', calculatePossibleGames(input.trim()));
    console.log('Minimums:', calculateMinimums(input.trim()));
}
