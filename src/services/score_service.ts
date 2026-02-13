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
