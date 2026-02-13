import React, {useState, useRef} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {constants} from './constants';
import {useStore} from './services/store';

export const NewPlayerInputV3 = () => {
  const [showInput, setShowInput] = useState(false);
  const playerNameInputRef = useRef<TextInput>(null);

  const [name, setName] = useState('');
  const addPlayer = useStore((state: any) => state.addPlayer);
  const morphAnim = useRef(new Animated.Value(0)).current; // 0: icon, 1: input

  const animationDuration = 200;

  const animateToInput = () => {
    Animated.timing(morphAnim, {
      toValue: 1,
      duration: animationDuration,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start(() => {
      setShowInput(true)
      playerNameInputRef.current?.focus()
    });
  };

  const animateToIcon = () => {
    Animated.timing(morphAnim, {
      toValue: 0,
      duration: animationDuration / 2,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start(() => setShowInput(false));
  };

  const handleAddIconPress = () => {
    animateToInput();
  };

  const handleValidate = () => {
    addPlayer(name.substring(0, 30));
    setName('');

    animateToIcon();
  };

  const iconOpacity = morphAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 0.2, 0],
  });
  const inputScale = morphAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.7, 1],
  });
  const inputOpacity = morphAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0.2, 1],
  });
  const iconWidth = morphAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 7],
  });

  const renderAddPlayerIconButton = () => {
    return (
      <Animated.View
        style={[
          {opacity: iconOpacity},
          styles.addPlayerIconContainer,
        ]}
        pointerEvents={showInput ? 'none' : 'auto'}>
        <TouchableOpacity
          onPress={handleAddIconPress}
          style={[
            {transform: [{scaleX: iconWidth}]},
            styles.addPlayerIconButton,
          ]}>
          <Icon name="person-add" size={32} color="#333" />
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const renderNameInput = () => {
    return (
      <Animated.View
        style={{
          opacity: inputOpacity,
          transform: [{scale: inputScale}],
          ...styles.inputMainContainer
        }}
        pointerEvents={showInput ? 'auto' : 'none'}>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            onSubmitEditing={handleValidate}
            placeholder="Nom du joueur"
            ref={playerNameInputRef}
          />
          <TouchableOpacity
            onPress={handleValidate}
            style={styles.validateButton}>
            <Icon name="check" size={28} color="#fff" />
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      {renderAddPlayerIconButton()}
      {renderNameInput()}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    marginVertical: 12,
  },
  addPlayerIconContainer:{
    position: 'absolute',
    width: '100%',
    alignItems: 'center',
  },
  addPlayerIconButton: {
    backgroundColor: '#e0e0e0',
    borderRadius: 24,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputMainContainer: {
    width: '100%',
    alignItems: 'center',
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
