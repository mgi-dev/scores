import React, {useState, useRef} from 'react';
import { Button, FlatList, Text, TouchableOpacity, View, SafeAreaView, StyleSheet} from 'react-native';
import {Player} from './player'

import {Menu} from './menu'
import { useStore } from './services/store';

class PlayerData {

    name: string
    key: string

  constructor(name: string, key: string) {
    this.name = name;
    this.key = key;
  }
}

export const ScoreBoard = () => {
    
    const playersData = useStore((state: any) => state.playersData);
      

  return (
        <View>
          <Menu
          />
          <Text></Text>
          <Text></Text>
          <FlatList
            data={playersData}
            renderItem={({item}) => <Player name={item.name} />}
            keyExtractor={item => item.key}              
          />
            
          
        </View>
      
  );
};

const playerStyles = StyleSheet.create({
  playerName: {
    fontSize: 40
  },
  inputStyle: {
    height: 50,
    borderColor: '#ccc',
    color: 'red',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    marginBottom: 16,
  }
});