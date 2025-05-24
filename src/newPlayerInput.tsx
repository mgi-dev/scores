import React, {useState, useCallback} from 'react';
import {Text, TextInput, View, StyleSheet} from 'react-native';
import { constants } from './constants';

type MyInputProps = {
  onSubmit: (value: string) => void;
};


export const NewPlayerInput = (props: MyInputProps) => {
    
    const [name, setName] = useState('');
  
    const handleSubmit = () => {
      console.log(name)  
      props.onSubmit(name)
        setName('');
        console.log(name)
    }

  return (
        <View style={playerStyles.mainContainer}>
          <Text>Ajouter Joueur</Text>
          <TextInput 
            style = {playerStyles.inputStyle}
            value={name}
            onChangeText={(text) => {
                setName(text)
            }}
            onSubmitEditing={handleSubmit}
            
            />

        </View>
  );
};




const playerStyles = StyleSheet.create({
  mainContainer: {
    width: 150,
  },
  playerName: {
    fontSize: constants.bigFont
  },
  inputStyle: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: constants.mediumFont,
    backgroundColor: '#f9f9f9',
    marginBottom: 16,
  }
});



