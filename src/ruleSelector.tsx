import React, {useState, useCallback} from 'react';
import {Text, TextInput, View, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { constants } from './constants';
import { setRule } from './services/ruleService';


type MyInputProps = {
  onPress: (menuStatus: boolean) => void;
};


export const RuleSelector = (props: MyInputProps) => {
    
    const [selectedValue, setSelectedValue] = useState(constants.rules.DEFAULT);


    const setRule = (ruleName: string) => {
        setSelectedValue(ruleName)
        setRule(ruleName)
    }

  return (
    <View
        style={styles.container}
        >
        <Text>Règles : </Text>
        <Picker
            selectedValue={selectedValue}
            onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
            style={styles.picker}
            prompt="Règles à appliquer"
            dropdownIconColor='black'
            
        >
            <Picker.Item label="Aucune (Defaut)" value={constants.rules.DEFAULT} />
            <Picker.Item label="Dumbal" value={constants.rules.DEFAULT} />
        </Picker>
      </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
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