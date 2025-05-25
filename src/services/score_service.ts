import { constants } from '../constants';


export const updateScore = (score: number, difference: number, operation: string) : number => {
    if (operation === constants.operations.ADD) {
        return score + difference;
    } else {
        return score - difference;
    }
};


export const hasWon = (selectedRule: string, score: number, targetScore: number, operation: string): boolean => {
    switch(selectedRule){
        case constants.rules.DEFAULT: {
            return defaultRule(score, targetScore, operation);
        }
        case constants.rules.DUMBAL: {
            return dumbalRule(score, targetScore, operation);
        }
        default: {
            return false;
        }
    }
};



const defaultRule = (score: number, targetScore: number, operation: string): boolean => {
    if (operation == constants.operations.ADD) {
        return score >= targetScore;
    } else {
        return score <= targetScore;
    }
};


const dumbalRule = (score: number, targetScore: number, operation: string): boolean => {
    if (operation == constants.operations.ADD) {
        return score >= targetScore;
    } else {
        return score <= targetScore;
    }
};
