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
      if (value < 0.5){
        setIsFlipped(false)
      }else 
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
      setIsFlipped(true);
      console.log('fliping');
    });
  };

  const flipToFront = () => {
    Animated.timing(flipAnim, {
      toValue: 0,
      duration: 400,
      useNativeDriver: false,
    }).start(() => {
      setIsFlipped(false);
      console.log('counter fliping');
    });
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) =>
        Math.abs(gestureState.dy) > 20,
      onPanResponderRelease: (_, gestureState) => {
        flipAnim.stopAnimation((currentValue: number) => {
          console.log(isFlipped);
          if (currentValue < 0.5) {
            flipToBack();
          } else {
            flipToFront();
          }
        });
      },
    }),
  ).current;

  const rotateX = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const counterRotateX = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '0deg'],
  });

  const frontOpacity = flipAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 0.3, 0],
  });

  const backOpacity = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });


  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.card,
          {
            backgroundColor: '#f53',
            opacity: frontOpacity,
            transform: [{rotateX}],
            position: 'absolute',
          },
        ]}
        {...panResponder.panHandlers}>
        <Text style={styles.text}>{isFlipped ? "yes": "false"}</Text>
      </Animated.View>
      <Animated.View
        style={[
          styles.card,
          {
            backgroundColor: 'green',
            opacity: backOpacity,
            transform: [{rotateX: counterRotateX}],
            position: 'absolute',
          },
        ]}
        pointerEvents={isFlipped ? 'auto' : 'none'}
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
