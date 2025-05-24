
import { constants } from './../constants';


var selectedRule: string = constants.rules.DEFAULT



export const setRule = (rule: string) => {
    selectedRule = rule
}

export const hasWon = (score: number): boolean => {
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