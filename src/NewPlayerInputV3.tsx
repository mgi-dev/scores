import React, { useState, useRef } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Animated, Easing } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { constants } from './constants';
import { useStore } from './services/store';

export const NewPlayerInputV3 = () => {
  const [showInput, setShowInput] = useState(false);
  const [name, setName] = useState('');
  const addPlayer = useStore((state: any) => state.addPlayer);
  const morphAnim = useRef(new Animated.Value(0)).current; // 0: icon, 1: input
  
  const animationDuration = 900;

// Need to do the aniùmation in two steps.
  const animateToLargeIcon = () => {
    Animated.timing(morphAnim, {
      toValue: 1,
      duration: animationDuration,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start();
  };

  const animateToSmallIcon = () => {
    Animated.timing(morphAnim, {
      toValue: 0,
      duration: animationDuration,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start();
  };


  const animateToInput = () => {
    Animated.timing(morphAnim, {
      toValue: 1,
      duration: animationDuration,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start(() => setShowInput(true));
  };

  const animateToIcon = () => {
    Animated.timing(morphAnim, {
      toValue: 0,
      duration: animationDuration,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start(() => setShowInput(false));
  };

  const handleAddIconPress = () => {
    animateToInput();
  };

  const handleValidate = () => {
    addPlayer(name);
    setName('');

    animateToIcon();
  };

  // Interpolate values for morphing effect
  const iconScale = morphAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 0.7] });
  const iconOpacity = morphAnim.interpolate({ inputRange: [0, 0.5, 1], outputRange: [1, 0.2, 0] });
  const inputScale = morphAnim.interpolate({ inputRange: [0, 1], outputRange: [0.7, 1] });
  const inputOpacity = morphAnim.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0, 0.2, 1] });
  // this is broken, width not supported , see https://reactnative.dev/docs/transforms instead
  const iconWidth = morphAnim.interpolate({ inputRange: [0, 1], outputRange: [constants.windowWidth * 0.12, constants.windowHeight * 0.40] });

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          position: 'absolute',
          opacity: iconOpacity,
          transform: [{ scale: iconScale }],
        width: '100%',
        //   marginLeft:'35%',
        //   marginRight:'35%',
        //   borderColor: 'red',
          borderWidth:1,
          alignItems: 'center',
        }}
        pointerEvents={showInput ? 'none' : 'auto'}
      >
        <TouchableOpacity onPress={handleAddIconPress} style={{
            backgroundColor: '#e0e0e0',
            borderRadius: 24,
            // width: '12%',
            width: iconWidth,
            padding: 8,
            alignItems: 'center',
            justifyContent: 'center',
            
        }}>
          <Icon name="person-add" size={32} color="#333" />
        </TouchableOpacity>
      </Animated.View>
      <Animated.View
        style={{
          opacity: inputOpacity,
          transform: [{ scale: inputScale }],
          width: '100%',
          alignItems: 'center',
        }}
        pointerEvents={showInput ? 'auto' : 'none'}
      >
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Nom du joueur"
            autoFocus={showInput}
          />
          <TouchableOpacity onPress={handleValidate} style={styles.validateButton}>
            <Icon name="check" size={28} color="#fff" />
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    height: 44,
    width: 140,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: constants.mediumFont,
    backgroundColor: '#fff',
    marginRight: 8,
  },
  validateButton: {
    backgroundColor: '#4caf50',
    borderRadius: 20,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});



