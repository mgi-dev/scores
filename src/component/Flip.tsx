import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  PanResponder,
  Dimensions,
} from 'react-native';

const CARD_WIDTH = Dimensions.get('window').width * 0.8;
const CARD_HEIGHT = 120;

export const Flip = () => {
  
  const flipAnim = useRef(new Animated.Value(0)).current;

  const [isFlipped, setIsFlipped] = useState(false);

  // Listen to flipAnim changes and update the ref
  useEffect(() => {
    const id = flipAnim.addListener(({ value }) => {
      // Even gemini could not do such a masterpiece.
      if (value < 0.5){
        setIsFlipped(false)
      } else if (0.5 < value && value <= 1){
        setIsFlipped(true)
      } else if (value > 1.5  && value <= 2){
        setIsFlipped(false)
      } else 
        setIsFlipped(true)
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
      flipAnim.setValue(0)
      console.log('fliping again');
    });
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) =>
        gestureState.dy < -20,
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
    inputRange: [0, 1, 2],
    outputRange: ['0deg', '360deg', '720deg'],
  });


  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.card,
          {
            backgroundColor: isFlipped ? 'green' : 'orange',
            transform: [{rotateX}],
            position: 'absolute',
          },
        ]}
        {...panResponder.panHandlers}>
        <Text style={styles.text}>{isFlipped ? "yes": "false"}</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 30,
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backfaceVisibility: 'hidden',
    borderWidth: 1,
    borderColor: '#888',
  },
  text: {
    fontSize: 28,
    color: '#222',
    fontWeight: 'bold',
  },
});
