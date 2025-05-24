import React, {useState, useRef} from 'react';
import {Animated, Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import { StripeButton } from './stripeButton';
import {NewPlayerInput} from './newPlayerInput';
import { RuleSelector } from './ruleSelector';
import { useStore } from './services/store';


const menu_size = 250;

export const Menu = () => {

    const [menuStatus, setMenusStatus] = useState(false);
    const slideAnim = useRef(new Animated.Value(menuStatus ? 0 : -(menu_size - 30))).current; // départ invisible
    const addPlayer = useStore((state: any) => state.addPlayer);
    const deletePLayers = useStore((state: any) => state.deletePLayers);


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
            <View/>
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
});
