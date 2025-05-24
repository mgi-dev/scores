import React, {useState} from 'react';
import {Text, TextInput, TouchableOpacity, View, StyleSheet} from 'react-native';
import {constants} from './constants'


export const Player = ({name}: {name: string}) => {
  const [score, setScore] = useState(0);
  const [addedScore, setAddedScore] = useState(0);
  
  const handleSubmit = () => {
        setScore(addedScore + score)
        setAddedScore(Number(0))
  }
  
  const hasWon = (): boolean => {
    return  score >= 100 ? true : false
  }

  return (
    <View
      style={playerStyles.mainContainer}
    >
      <Text
        style={{...playerStyles.playerName, color: hasWon() ? 'green': 'black'}}
      >{name}</Text>
      <View style={playerStyles.scoreContainer}>
      <Text style = {{...playerStyles.score, color: hasWon() ? 'green': 'black'}}>{score}</Text>
      
        <TextInput 
        style = {playerStyles.scoreInput}
          keyboardType="numeric"
          onChangeText={(text) => {
              setAddedScore(Number(text))
          }}
          onSubmitEditing={handleSubmit}
          value={addedScore != 0 ? String(addedScore): ""}
          
          />
      
        <View style={{alignSelf: 'center',}}>
          <TouchableOpacity
            onPress={()=> {
              setScore(0)
              setAddedScore(0)
            }}
          >
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
    fontSize: constants.bigFont
  }
});