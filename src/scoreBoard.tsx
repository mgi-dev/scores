import React from 'react';
import { ScrollView, Text, View} from 'react-native';
import {Player} from './player';

import {Menu} from './menu';
import { GameStore, useStore } from './services/store';
import { PlayerData } from './services/interfaces';


export const ScoreBoard = () => {

    const playersData = useStore((state: GameStore) => state.playersData);


  return (
        <View>
          <Menu/>
          <Text />
          <Text />
          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ paddingVertical: 8 , paddingBottom: 200}}
          >
            {playersData.map((item: PlayerData) => (
              <View key={item.key} style={{ marginBottom: 12 }}>
                <Player playerData={item} />
              </View>
            ))}
          </ScrollView>
        </View>
  );
};
