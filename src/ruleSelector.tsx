import React from 'react';
import {Text, View, StyleSheet } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { constants } from './constants';
import { useStore } from './services/store';


export const RuleSelector = () => {

    const selectedRule = useStore((state: any) => state.selectedRule);
    const updateSelectedRule = useStore((state: any) => state.updateSelectedRule);


  return (
    <View
        style={styles.container}
        >
        <Text>Règles : </Text>
        <Picker
            selectedValue={selectedRule}
            onValueChange={(itemValue, _) => {
                updateSelectedRule(itemValue);
            }}
            style={styles.picker}
            prompt="Règles à appliquer"
            dropdownIconColor="black"

        >
            <Picker.Item label="Aucune (Defaut)" value={constants.rules.DEFAULT} />
            <Picker.Item label="Dumbal" value={constants.rules.DUMBAL} />
        </Picker>
      </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  picker: {
    height: 50,
    width: 200,
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    justifyContent: 'center',
    color: 'black',
  },
});
