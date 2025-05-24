import React, {useState, useEffect, useRef} from 'react';
import {Animated, Text, TextInput, TouchableOpacity, View, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import { constants } from './constants';
import { StripeButton } from './stripeButton';
import {NewPlayerInput} from './newPlayerInput'
import { RuleSelector } from './ruleSelector';


type MyInputProps = {
  addNewPlayer: (value: string) => void;
  resetGame: () => void;
};

class PlayerData {

    name: string
    key: string

  constructor(name: string, key: string) {
    this.name = name;
    this.key = key;
  }
}

const menu_size = 250

export const Menu = (props: MyInputProps) => {

    const [menuStatus, setMenusStatus] = useState(false);
    const slideAnim = useRef(new Animated.Value(menuStatus ? 0 : - (menu_size - 30))).current; // départ invisible
    
    // useEffect(() => {
    //      Animated.timing(slideAnim, {
    //      toValue: 0,
    //      duration: 1000,
    //      useNativeDriver: true,
    //      }).start();
    //  }, [slideAnim]);


    const toggleMenu = () => {
        setMenusStatus(!menuStatus)
        Animated.timing(slideAnim, {
        toValue: menuStatus ? 0 : - (menu_size - 30),
        duration: 350,
        useNativeDriver: true,
        }).start();
    };

    
    const getContainerCss = () => {
        return menuStatus ? styles.menuContainerDeployed: styles.menuContainerFolded
    }
    
    
    const getDevContent = () => {
        return __DEV__  ?
            <TouchableOpacity
                onPress={()=> {
                    props.addNewPlayer("Jean Michel")
                }}
                >
                <Text>ADD</Text>
            </TouchableOpacity>
            : <Text></Text>
    }



  return (
    <Animated.View style={{...styles.mainContainer, ...getContainerCss(), ...{ transform: [{ translateY: slideAnim }] }}}>
        <View style={{...styles.menuContainer}}>
            {getDevContent()}
            <View/>
            <View
                style={{flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}}
            >
            
            <NewPlayerInput onSubmit={props.addNewPlayer}/>
            <TouchableOpacity
                onPress={()=> {
                    props.resetGame()
                }}
            >
            <Text>Reset</Text>
            </TouchableOpacity>
            </View>
        <RuleSelector/>
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

    }
});