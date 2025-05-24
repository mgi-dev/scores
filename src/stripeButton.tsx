import React, {useState} from 'react';
import {View, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import { constants } from './constants';

type MyInputProps = {
  onPress: (menuStatus: boolean) => void;
};


export const StripeButton = (props: MyInputProps) => {

    const [menuStatus, setMenusStatus] = useState(false);

    const getContainerCssForStatus = () => {
        return menuStatus ? {} : {transform: [ { rotate: '180deg' }]};
    };



  return (
    <TouchableWithoutFeedback
        hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}
        onPress={() => {
            props.onPress(!menuStatus);
            setMenusStatus(!menuStatus);

        }}
    >
        <View style={{}}>
            <View style={{...styles.lineContainer, ...getContainerCssForStatus()}}>
                <View style={styles.line} />
                <View style={{...styles.middleLine, ...styles.leftMidleLine}} />
                <View style={{...styles.middleLine, ...styles.rightMidleLine}} />
                <View style={styles.line} />
            </View>
            <View style={{...styles.lineContainer, ...{marginTop: -35}, ...getContainerCssForStatus()}}>
                <View style={styles.line} />
                <View style={{...styles.middleLine, ...styles.leftMidleLine}} />
                <View style={{...styles.middleLine, ...styles.rightMidleLine}} />
                <View style={styles.line} />
            </View>
        </View>
    </TouchableWithoutFeedback>
  );
};


const stripeScale = 0.5;
// const stripeScale = 1.0

const styles = StyleSheet.create({
  lineContainer: {
    alignItems: 'center',
    marginVertical: 7 * stripeScale,
    flexDirection: 'row',

  },
  line: {
    width: constants.windowWidth / 2 - 15,
    height: 2,
    backgroundColor: '#000',
    marginVertical: 2 * stripeScale,

    alignSelf: 'center',

  },
  middleLine: {
    width: 60 * stripeScale,
    height: 14 * stripeScale,
    marginTop: 20 * stripeScale,
    borderBottomWidth: 2,
    borderColor: '#000',
  },
  leftMidleLine: {
    transform: [ { rotate: '30deg' }],
    marginRight: -7 * stripeScale,
    marginLeft: -1 * stripeScale,
  },
  rightMidleLine: {
    transform: [ { rotate: '-30deg' }],
    marginLeft: -7 * stripeScale,
    marginRight: -1 * stripeScale,
  },

});
