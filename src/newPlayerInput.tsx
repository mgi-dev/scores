import React, {useState} from 'react';
import {Text, TextInput, View, StyleSheet} from 'react-native';
import { constants } from './constants';
import { useStore } from './services/store';


export const NewPlayerInput = () => {

    const [name, setName] = useState('');
    const addPlayer = useStore((state: any) => state.addPlayer);


    const handleSubmit = () => {
      addPlayer(name);
      setName('');
    };

  return (
        <View style={playerStyles.mainContainer}>
          <Text>Ajouter Joueur</Text>
          <TextInput
            style = {playerStyles.inputStyle}
            value={name}
            onChangeText={(text) => {
                setName(text);
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
    fontSize: constants.bigFont,
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
  },
});



