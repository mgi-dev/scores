
import { constants } from './../constants';


export const hasWon = (selectedRule: string, score: number): boolean => {
    console.log(score, selectedRule)
    switch(selectedRule){

        case constants.rules.DEFAULT: {
            return defaultRule(score)
        }
        case constants.rules.DUMBAL: {
            return dumbalRule(score)
        }
        default: {
            return false
        }
    }
}


const defaultRule = (score: number): boolean => {
    return false;
}

const dumbalRule = (score: number): boolean => {
    return score >= 100;
}