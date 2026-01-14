import React, {useEffect, useRef, useState} from 'react';
import {Animated, PanResponder, Dimensions} from 'react-native';
import {Player} from '../player';
import {PlayerData} from '../services/interfaces';
import { constants } from '../constants';


/**
 * An interactive card component that rotates 360 degrees on swipe up gestures
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
      // Even gemini could not do such a masterpiece.
      if (value < 0.5) {
        setIsFlipped(false);
      } else if (0.5 < value && value <= 1) {
        setIsFlipped(true);
      } else if (value > 1.5 && value <= 2) {
        setIsFlipped(false);
      } else setIsFlipped(true);
    });
    return () => flipAnim.removeListener(id);
  }, [flipAnim]);

  const flipToBack = () => {
    Animated.timing(flipAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: false,
    }).start(() => {
      console.log('fliping');
    });
  };

  const flipToFront = () => {
    Animated.timing(flipAnim, {
      toValue: 2,
      duration: 400,
      useNativeDriver: false,
    }).start(() => {
      flipAnim.setValue(0);
      console.log('fliping again');
    });
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => gestureState.dy < -20,
      onPanResponderRelease: (_, gestureState) => {
        flipAnim.stopAnimation((currentValue: number) => {
          if (currentValue < 1) {
            flipToBack();
          } else {
            flipToFront();
          }
        });
      },
    }),
  ).current;

  const rotateX = flipAnim.interpolate({
    // too many rotation. will find anoother way.
    inputRange: [0, 1, 2],
    outputRange: ['0deg', '360deg', '720deg'],
  });

  return (
    <Animated.View
      style={[
        {
          transform: [{rotateX}],
        },
      ]}
      {...panResponder.panHandlers}>
      <Player
        playerData={props.playerData}
        operation={
        isFlipped ? constants.operations.ADD : constants.operations.SUB
          }
      />
    </Animated.View>
  );
};
