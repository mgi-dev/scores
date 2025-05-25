import React from 'react';
import { ScrollView, Text, View} from 'react-native';
import {Player} from './player';

import {Menu} from './menu';
import { useStore, PlayerData } from './services/store';


export const ScoreBoard = () => {

    const playersData = useStore((state: any) => state.playersData);


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
                <Player name={item.name} />
              </View>
            ))}
          </ScrollView>
        </View>
  );
};
