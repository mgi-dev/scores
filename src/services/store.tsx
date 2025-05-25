import { create } from 'zustand';
import { constants } from './../constants';
import { hasWon, updateScore } from './score_service';
import {PlayerData} from './interfaces';

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
    updatePlayerScore: (playerData: PlayerData, addedScore: number) => void
    resetPlayerScore: (playerData: PlayerData) => void

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
        return hasWon(selectedRule, score, get().targetScore, get().operation);
    },

    playersData: [],
    addPlayer: (playerName: string) => {
        const playersData = get().playersData;
        let newPlayerData = {
            name: playerName,
            score: 0,
            key: String(Number(playersData.length) + 1),
            hasWon: false,
        };
        set({playersData: [...get().playersData, newPlayerData]});
    },
    deletePLayers: () => set({playersData: []}),
    
    updatePlayerScore: (newPlayerData: PlayerData, addedScore: number) => {
        
        let selectedPlayer: PlayerData = get().playersData.find((player: PlayerData) => player.key == newPlayerData.key)
        selectedPlayer.score = updateScore(selectedPlayer.score, addedScore, get().operation)
        selectedPlayer.hasWon = get().hasWon(selectedPlayer.score)

        set({playersData: [...get().playersData]});
    },

    resetPlayerScore: (playerData: PlayerData) => {
        
        let selectedPlayer: PlayerData = get().playersData.find((player: PlayerData) => player.key == playerData.key)
        selectedPlayer.score = get().initialScore
        selectedPlayer.hasWon = get().hasWon(selectedPlayer.score)
        
        set({playersData: [...get().playersData]});
    },

}));
