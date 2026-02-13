import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useStore } from '../service/store';

export const DeletePlayersButton = () => {
  const deletePLayers = useStore((state: any) => state.deletePLayers);

  const handleDelete = () => {
    deletePLayers();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleDelete} style={styles.button}>
        <Icon name="delete" size={24} color="#fff" />
        <Text style={styles.text}>Supprimer tous les joueurs</Text>
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
    backgroundColor: '#e53935',
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
