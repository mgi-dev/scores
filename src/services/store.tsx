import { create } from 'zustand';
import { constants } from './../constants';

interface PlayerData {
  name: string;
  score: number;
  key?: string;
}

interface GameStore {
    selectedRule: string;
    updateSelectedRule: (value: string) => void;

    targetScore: number;
    updateTargetScore: (value: number) => void;

    hasWon: (score: number) => boolean;

    playersData: PlayerData[];
    addPlayer: (playerName: string) => void;
    deletePLayers: () => void;

}

export const useStore = create<GameStore>((set, get: any) => ({
    selectedRule: constants.rules.DEFAULT,
    updateSelectedRule: (value: string) => set({selectedRule: value}),

    targetScore: 100,
    updateTargetScore: (value: number) => set({targetScore: value}),

    hasWon: (score: number) => {
        const selectedRule = get().selectedRule;
        console.log('mhhh', selectedRule);
        return hasWon(selectedRule, score);
    },

    playersData: [],
    addPlayer: (playerName: string) => {
        const playersData = get().playersData;
        let newPlayerData = {
            name: playerName,
            score: 0,
            key: String(Number(playersData.length) + 1),
        };
        set({playersData: [...get().playersData, newPlayerData]});
    },
    deletePLayers: () => set({playersData: []}),

}));



const hasWon = (selectedRule: string, score: number): boolean => {
    switch(selectedRule){
        case constants.rules.DEFAULT: {
            return defaultRule(score);
        }
        case constants.rules.DUMBAL: {
            return dumbalRule(score);
        }
        default: {
            return false;
        }
    }
};


const defaultRule = (score: number): boolean => {
    return score >= 100;
};

const dumbalRule = (score: number): boolean => {
    return score >= 100;
};
