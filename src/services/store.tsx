import { create } from 'zustand';
import { constants } from "./../constants";


export const useStore = create((set, get: any) => ({
    selectedRule: constants.rules.DEFAULT,
    updateSelectedRule: (value: string) => set({selectedRule: value}),  
    
    targetScore: 100,
    updateTargetScore: (value: number) => set({targetScore: value}),  
    
    hasWon: (score: number) => {
        const selectedRule = get().selectedRule;
        console.log("mhhh", selectedRule)
        return hasWon(selectedRule, score);
    },  

    // playersData: [],
    // addPlayerData: (value: number) => set({playersData: playersData}),  

}));



export const hasWon = (selectedRule: string, score: number): boolean => {
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