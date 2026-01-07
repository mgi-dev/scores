import React, {useState} from 'react';
import {Text, TextInput, View, StyleSheet, TouchableOpacity} from 'react-native';
import { constants } from './constants';
import { useStore } from './services/store';


export const NewPlayerInputV2 = () => {

    const [name, setName] = useState('');
    const addPlayer = useStore((state: any) => state.addPlayer);


    const handleSubmit = () => {
        addPlayer(name);
        setName('');
    };

  return (
        <View style={playerStyles.mainContainer}>
            <Text>Ajouter Joueur</Text>
            <View style={playerStyles.horizontalContainer}>
                <TextInput
                    style={[playerStyles.inputStyle, { flex: 1, marginBottom: 0 }]}
                    value={name}
                    onChangeText={(text) => {
                        setName(text);
                    }}
                    onSubmitEditing={handleSubmit}
                />
                <TouchableOpacity onPress={handleSubmit} style={{ marginLeft: 8 }}>
                    <Text> + </Text>
                </TouchableOpacity>
            </View>
        </View>
  );
};




const playerStyles = StyleSheet.create({
    mainContainer: {
        width: 150,
        margin: constants.windowHeight * 0.02,  
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
    horizontalContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
}
);



