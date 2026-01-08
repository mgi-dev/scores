import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useStore } from './services/store';


const playerNames: Array<string> = [
  "Jeremy",
  "Henry",
  "Eve"
]

export const AddDebugPlayersButton = () => {
  const addPlayer = useStore((state: any) => state.addPlayer);

  const handlePress = () => {
    for (var name of playerNames){
      addPlayer(name);
    }
    
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress} style={styles.button}>
        <Icon name="add" size={24} color="#fff" />
        <Text style={styles.text}>Ajouter X joueurs</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 12,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: 'green',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 18,
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 8,
    fontSize: 16,
  },
});
