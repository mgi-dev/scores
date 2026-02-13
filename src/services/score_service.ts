import { constants } from '../constants';


export const updateScore = (score: string, difference: string, operation: string) : string => {
    if (isNaN(Number(difference))){
        // Happens when inputing nonsense (.336-, ...)
        return Number(score).toString();
    }
    if (isNaN(Number(score))){
        // Happen when playing with ∞ and -∞
        return '0';
    }
    if (operation === constants.operations.ADD) {
        var updatedScore = (Number(score) + Number(difference));
    } else {
        var updatedScore = (Number(score) - Number(difference));
    }
    if (updatedScore > 999999999){
        return '∞';
    } else if (updatedScore < -999999999){
        return '-∞';
    } else {
        return updatedScore.toString();
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
