import React, {useState} from 'react';
import {View, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import { constants } from './constants';

type MyInputProps = {
  onPress: (menuStatus: boolean) => void;
};


export const StripeButton = (props: MyInputProps) => {

    const [menuStatus, setMenusStatus] = useState(false);


    const getContainerCssForStatus = () => {
        return menuStatus ? {transform: [ { rotate: '180deg' }]} : {};
    };

  return (

    <TouchableWithoutFeedback
        hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}
        
        onPress={() => {
            props.onPress(!menuStatus);
            setMenusStatus(!menuStatus);

        }}
      >
        <View style={styles.mainContainer}>
            <View style={{...styles.lineContainer, ...getContainerCssForStatus()}}>
                <View style={styles.line} />
                <View style={{...styles.middleLine, ...styles.leftMidleLine}} />
                <View style={{...styles.middleLine, ...styles.rightMidleLine}} />
                <View style={styles.line} />
            </View>
            <View style={{...styles.lineContainer, ...{marginTop: -15}, ...getContainerCssForStatus()}}>
                <View style={styles.line} />
                <View style={{...styles.middleLine, ...styles.leftMidleLine}} />
                <View style={{...styles.middleLine, ...styles.rightMidleLine}} />
                <View style={styles.line} />
            </View>
        </View>
    </TouchableWithoutFeedback>
  );
};


const styles = StyleSheet.create({
  mainContainer:{
    marginTop: constants.windowHeight * 0.10
  },
  lineContainer: {
    alignItems: 'center',
    marginVertical: constants.windowHeight * 0.0034,
    flexDirection: 'row',

  },
  line: {
    width: constants.windowWidth * 0.442,
    height: constants.windowHeight * 0.003,
    backgroundColor: '#000',
    marginVertical: '2%',

    alignSelf: 'center',

  },
  middleLine: {
    width: constants.windowWidth * 0.07,
    height: constants.windowHeight * 0.003,
    marginTop: constants.windowHeight * 0.02,
    borderBottomWidth: constants.windowHeight * 0.003,
    borderColor: '#000',
  },
  leftMidleLine: {
    transform: [ { rotate: '30deg' }],
    marginRight: constants.windowWidth * -0.007,
    marginLeft: constants.windowWidth * -0.0044,
  },
  rightMidleLine: {
    transform: [ { rotate: '-30deg' }],
    marginLeft: constants.windowWidth * -0.007,
    marginRight: constants.windowWidth * -0.0044,
  },

});
