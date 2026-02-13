import React, {useEffect, useRef, useState} from 'react';
import {Animated, PanResponder, StyleSheet} from 'react-native';
import {Player} from '../player';
import {PlayerData} from '../services/interfaces';
import {constants} from '../constants';
import {View} from 'react-native';
import {PlayerScoreProvider} from '../context/PlayerContext';

/**
 * An interactive card component that rotates on swipe gestures
 * Only handle swippe logic and contains Player component.
 * Pass to the player the operaton to use based on flip state.
 *
 * @param {PlayerData} props.playerData - The player data to display on the card
 * @returns {JSX.Element} An animated View component with rotation transform
 *
 * @example
 * const playerData = { name: 'John', score: 100 };
 * <PlayerFlipWidget playerData={playerData} />
 */

export const PlayerFlipWidget = (props: {playerData: PlayerData}) => {
  const flipAnim = useRef(new Animated.Value(0)).current;

  const [isFlipped, setIsFlipped] = useState(false);
  
  
  useEffect(() => {
    const id = flipAnim.addListener(({value}) => {
      /* Track value of animation to set a boolean (isFlipped).
      The boolean drive the logic of the component, it switch styles and math operations.
      */
      if (value >= -2.5 && value < -1.5) {
        setIsFlipped(false); // blue
      } else if (value >=-1.5 && value < -0.5) {
        setIsFlipped(true); // red
      } else if (value >= -0.5 && value <= 0.5) {
        setIsFlipped(false); // blue
      } else if (value > 0.5 && value <= 1.5) {
        setIsFlipped(true); // red
      } else if (value > 1.5 && value <= 2.5) {
        setIsFlipped(false);
      } else {
        console.log("Value of FlipAnimation is out of range (", value, "). Should not be possible.")
      }
    });
    return () => flipAnim.removeListener(id);
  }, [flipAnim]);

  const flipToValue = (valueToFlip: number, shouldReset: boolean = false) => {
    Animated.timing(flipAnim, {
      toValue: valueToFlip,
      duration: 350,
      useNativeDriver: false,
    }).start(() => {
      if (shouldReset){
        // Reseting allow to have an "infinite" animation.
        flipAnim.setValue(0);
      }
    });
  };


    const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => Math.abs(gestureState.dy) > 20,
      onPanResponderRelease: (_, gestureState) => {
        flipAnim.stopAnimation((currentValue: number) => {
          let isSwipingUp = gestureState.dy < -20;
          let currentRoundedValue = Math.round(currentValue)
          let nextValue = isSwipingUp ? currentRoundedValue + 1 : currentRoundedValue - 1
          
          let shouldReset = Math.abs(nextValue) === 2
          flipToValue(nextValue, shouldReset)
        });
      },
    }),
  ).current;


  const rotateX = flipAnim.interpolate({
    inputRange: [-2, -1, 0, 1, 2],
    outputRange: ['-360deg', '-180deg', '0deg', '180deg', '360deg'],
  });

  const counterRotateX = flipAnim.interpolate({
    inputRange: [-2, -1, 0, 1, 2],
    outputRange: ['-540deg', '-360deg', '-180deg', '0deg', '180deg'],
  });

  return (

      <View style={styles.container}>
        <PlayerScoreProvider>
        <Animated.View
          style={[
            {
              transform: [{rotateX}],
              opacity: isFlipped ? 0 : 1,
              position: 'absolute',
            },
          ]}
          {...panResponder.panHandlers}>
          <Player
            playerData={props.playerData}
            operation={
              isFlipped ? constants.operations.SUB : constants.operations.ADD
            }
          />
        </Animated.View>
        <Animated.View
          style={[
            {
              opacity: isFlipped ? 1 : 0,
              transform: [{rotateX: counterRotateX}],
              position: 'absolute',
            },
          ]}
          pointerEvents={isFlipped ? 'auto' : 'none'}
          {...panResponder.panHandlers}>
          <Player
            playerData={props.playerData}
            operation={
              isFlipped ? constants.operations.SUB : constants.operations.ADD
            }
          />
        </Animated.View>
      </PlayerScoreProvider>
    </View>
  );

};


const styles = StyleSheet.create({
  container: {
    height: 120,
    alignItems: 'center',
  },
});
