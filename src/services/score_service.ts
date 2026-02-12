import { constants } from '../constants';


export const updateScore = (score: string, difference: string, operation: string) : string => {
    if (isNaN(Number(difference))){
        // difference should never be NaN. But it can happen Anyway.
        // This condition handle impossible cases.
        return Number(score).toString();
    }
    if (operation === constants.operations.ADD) {
        return (Number(score) + Number(difference)).toString();
    } else {
        return (Number(score) - Number(difference)).toString();
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
    if (operation === constants.operations.ADD) {
        return score >= targetScore;
    } else {
        return score <= targetScore;
    }
};


const dumbalRule = (score: number, targetScore: number, operation: string): boolean => {
    if (operation === constants.operations.ADD) {
        return score >= targetScore;
    } else {
        return score <= targetScore;
    }
};
