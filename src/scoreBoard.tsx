import React from 'react';
import { FlatList, Text, View} from 'react-native';
import {Player} from './player';

import {Menu} from './menu';
import { useStore } from './services/store';


export const ScoreBoard = () => {

    const playersData = useStore((state: any) => state.playersData);


  return (
        <View>
          <Menu/>
          <Text />
          <Text />
          <FlatList
            data={playersData}
            renderItem={({item}) => <Player name={item.name} />}
            keyExtractor={item => item.key}
          />
        </View>
  );
};