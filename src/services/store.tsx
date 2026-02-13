import { create } from 'zustand';
import { constants } from './../constants';
import { hasWon } from './score_service';
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

    totalAddedPlayerCount: number;
    increaseTotalAddedPlayerCount: () => void;

    deletePLayers: () => void;
    deletePlayer: (playerData: PlayerData) => void;
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
        let newPlayerData = {
            name: playerName,
            score: get().initialScore,
            key: String(get().totalAddedPlayerCount),
            hasWon: false,
        };
        set({playersData: [...get().playersData, newPlayerData]});
        get().increaseTotalAddedPlayerCount();
    },

    totalAddedPlayerCount: 0,
    increaseTotalAddedPlayerCount: () => {
        set({totalAddedPlayerCount: get().totalAddedPlayerCount + 1 });
    },

    deletePLayers: () => set({playersData: []}),

    deletePlayer: (playerData: PlayerData) => {
        set({playersData: get().playersData.filter((o: PlayerData) => o.key !== playerData.key),
        });
    },


    resetPlayerScore: (playerData: PlayerData) => {
        playerData.score = get().initialScore;
        playerData.hasWon = get().hasWon(playerData.score);
        set({playersData: [...get().playersData]});
    },

}));
