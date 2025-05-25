import React, {useState, useRef} from 'react';
import {Animated, Text, TextInput, TouchableOpacity, View, StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { StripeButton } from './stripeButton';
import {NewPlayerInput} from './newPlayerInput';
import { RuleSelector } from './ruleSelector';

import { useStore, GameStore } from './services/store';
import { constants } from './constants';

const menu_size = 350;

export const Menu = () => {

    const [menuStatus, setMenusStatus] = useState(false);
    const slideAnim = useRef(new Animated.Value(menuStatus ? 0 : -(menu_size - 30))).current;
    const addPlayer = useStore((state: GameStore) => state.addPlayer);
    
    const deletePLayers = useStore((state: GameStore) => state.deletePLayers);

    const operation = useStore((state: GameStore) => state.operation);
    const updateOperation = useStore((state: GameStore) => state.updateOperation);
    

    const initialScore = useStore((state: GameStore) => state.initialScore);
    const updateInitialScore = useStore((state: GameStore) => state.updateInitialScore);
    
    const targetScore = useStore((state: GameStore) => state.targetScore);
    const updateTargetScore = useStore((state: GameStore) => state.updateTargetScore);
    
    




    const toggleMenu = () => {
        setMenusStatus(!menuStatus);
        Animated.timing(slideAnim, {
        toValue: menuStatus ? 0 : -(menu_size - 30),
        duration: 350,
        useNativeDriver: true,
        }).start();
    };


    const getContainerCss = () => {
        return menuStatus ? styles.menuContainerDeployed : styles.menuContainerFolded;
    };


    const getDevContent = () => {
        return __DEV__  ?
            <TouchableOpacity
                onPress={()=> {
                    addPlayer('Jean Michel');
                }}
                >
                <Text>ADD</Text>
            </TouchableOpacity>
            : <Text />;
    };



  return (
    <Animated.View style={{...styles.mainContainer, ...getContainerCss(), ...{ transform: [{ translateY: slideAnim }] }}}>
        <View style={{...styles.menuContainer}}>
            {getDevContent()}
        </View>
        <View
            style={{flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}}
        >

            <NewPlayerInput />
            
            <TouchableOpacity
                onPress={()=> {
                    deletePLayers();
                }}
            >
            <Text>Reset</Text>
            </TouchableOpacity>
        </View>
        <RuleSelector/>
        <View style={styles.operationPickerContainer}>
            <Text>Operation</Text>
            <Picker
                selectedValue={operation}
                onValueChange={(itemValue, _) => {
                    updateOperation(itemValue);
                }}
                style={styles.operationPicker}
                prompt="Operation"
                dropdownIconColor="black"

            >
                <Picker.Item label="Addition (Defaut)" value={constants.operations.ADD} />
                <Picker.Item label="Soustraction" value={constants.operations.SUB} />
            </Picker>
        </View>
        <View style={styles.operationPickerContainer}>
            <Text>Initial score</Text>
        
            <TextInput
                style = {styles.inputStyle}
                keyboardType="numeric"
                value={String(initialScore)}
                onChangeText={(score) => {
                    updateInitialScore(Number(score));
                }}
            />
        </View>


        <View style={styles.operationPickerContainer}>
            <Text>Target score</Text>
            <TextInput
                style = {styles.inputStyle}
                keyboardType="numeric"
                value={String(targetScore)}
                onChangeText={(score) => {
                    updateTargetScore(Number(score));
                }}
            />
        </View>

        <View style={{paddingBottom: 5.5}}>
            <StripeButton onPress={toggleMenu}/>
        </View>
    </Animated.View>

  );
};



const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor:'#EDEDED',
        position: 'absolute',
        zIndex:2,
        opacity: 1.0,
        height: menu_size,
        justifyContent: 'space-between',

    },
    menuContainerDeployed: {

    },
    menuContainerFolded: {

    },
    menuContainer: {

    },

operationPickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  operationPicker: {
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
