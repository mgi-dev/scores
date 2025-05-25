import { create } from 'zustand';
import { constants } from './../constants';
import { hasWon } from './score_service';

interface PlayerData {
  name: string;
  score: number;
  key?: string;
}

export interface GameStore {
    selectedRule: string;
    updateSelectedRule: (value: string) => void;

    initialScore: number;
    updateInitialScore: (value: number) => void;

    targetScore: number;
    updateTargetScore: (value: number) => void;
    
    operation: string;
    updateOperation: (value: string) => void;
    

    hasWon: (score: number) => boolean;

    playersData: PlayerData[];
    addPlayer: (playerName: string) => void;
    deletePLayers: () => void;

}

export const useStore = create<GameStore>((set, get: any) => ({
    selectedRule: constants.rules.DEFAULT,
    updateSelectedRule: (value: string) => set({selectedRule: value}),

    initialScore: 0,
    updateInitialScore: (value: number) => set({initialScore: value}),

    targetScore: 100,
    updateTargetScore: (value: number) => set({targetScore: value}),

    operation: constants.operations.ADD,
    updateOperation: (value: string) => set({operation: value}),
    

    hasWon: (score: number) => {
        const selectedRule = get().selectedRule;
        console.log('mhhh', selectedRule);
        return hasWon(selectedRule, score, get().targetScore, get().operation);
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
