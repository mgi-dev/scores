import React, {useState} from 'react';
import {Text, TextInput, TouchableOpacity, View, StyleSheet} from 'react-native';
import {constants} from './constants';
import { useStore, GameStore } from './services/store';
import { PlayerData } from './services/interfaces';
import Icon from 'react-native-vector-icons/MaterialIcons';


export const Player = ({playerData}: {playerData: PlayerData}) => {

  const [addedScore, setAddedScore] = useState(0);

  const updatePlayerScore= useStore((state: GameStore) => state.updatePlayerScore);
  const resetPlayerScore= useStore((state: GameStore) => state.resetPlayerScore);


  const handleSubmit = () => {    
    updatePlayerScore(playerData, addedScore)
    setAddedScore(0);
  };


  return (
    <View
      style={playerStyles.mainContainer}
    >
      <Text
        style={{...playerStyles.playerName, color: playerData.hasWon ? 'green' : 'black'}}
      >{playerData.name}</Text>
      <View style={playerStyles.scoreContainer}>
      <Text style = {{...playerStyles.score, color: playerData.hasWon ? 'green' : 'black'}}>{playerData.score}</Text>

        <TextInput
        style = {playerStyles.scoreInput}
          keyboardType="numeric"
          onChangeText={(text) => {
              setAddedScore(Number(text));
          }}
          onSubmitEditing={handleSubmit}
          value={addedScore !== 0 ? String(addedScore) : ''}

          />

        <View style={{alignSelf: 'center'}}>
          <TouchableOpacity
            onPress={()=> {
              resetPlayerScore(playerData)
              setAddedScore(0);
            }}
          >
            <Icon name="refresh" size={30} color="#000" />
            <Text>Reset</Text>
          </TouchableOpacity>
        </View>
    </View>
    </View>
  );
};



const playerStyles = StyleSheet.create({
  mainContainer: {
    margin: 10,
    borderWidth: 1,
    borderColor:'rgb(177, 183, 185)',
    borderRadius: 8,
    paddingBottom:8,
    backgroundColor: '#f5f5f5',
  },
  scoreContainer: {
    flexDirection: 'row',
    width: constants.windowWidth,
    justifyContent: 'space-evenly',

  },
  playerName: {
    fontSize: constants.littleFont,
    paddingLeft: 10,
  },
  scoreInput: {
    width: 50,
    borderColor: '#ccc',
    color: 'black',
    borderWidth: 1,

    backgroundColor: '#f9f9f9',
    alignSelf: 'center',
  },
  score: {
    fontSize: constants.bigFont,
  },
});
