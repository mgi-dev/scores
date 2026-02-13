import { create } from 'zustand';
import {PlayerData} from './interfaces';

export interface GameStore {

    playersData: PlayerData[];
    addPlayer: (playerName: string) => void;

    totalAddedPlayerCount: number;
    increaseTotalAddedPlayerCount: () => void;

    deletePLayers: () => void;
    deletePlayer: (playerData: PlayerData) => void;

}


export const useStore = create<GameStore>((set, get: any) => ({

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

}));
