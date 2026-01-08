import React, {useState, useRef} from 'react';
import {
  Animated,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {StripeButton} from './stripeButton';
import {NewPlayerInput} from './newPlayerInput';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {useStore, GameStore} from './services/store';
import {constants} from './constants';

const menu_size = constants.windowHeight * 0.6;

export const Menu = () => {
  const [menuStatus, setMenusStatus] = useState(false);
  const slideAnim = useRef(
    new Animated.Value(menuStatus ? 0 : -(menu_size - 30)),
  ).current;
  const addPlayer = useStore((state: GameStore) => state.addPlayer);

  const deletePLayers = useStore((state: GameStore) => state.deletePLayers);

  const operation = useStore((state: GameStore) => state.operation);
  const updateOperation = useStore((state: GameStore) => state.updateOperation);

  const initialScore = useStore((state: GameStore) => state.initialScore);
  const updateInitialScore = useStore(
    (state: GameStore) => state.updateInitialScore,
  );

  const targetScore = useStore((state: GameStore) => state.targetScore);
  const updateTargetScore = useStore(
    (state: GameStore) => state.updateTargetScore,
  );

  const toggleMenu = (newMenuStatus: boolean) => {
    setMenusStatus(newMenuStatus);
    Animated.timing(slideAnim, {
      toValue: newMenuStatus ? 0 : -(menu_size - 30),
      duration: 350,
      useNativeDriver: true,
    }).start();
  };

  const getContainerCss = () => {
    return menuStatus
      ? styles.menuContainerDeployed
      : styles.menuContainerFolded;
  };

  const getDevContent = () => {
    return __DEV__ ? (
      <TouchableOpacity
        onPress={() => {
          addPlayer('Jean Michel');
        }}>
        <Text>ADD</Text>
      </TouchableOpacity>
    ) : (
      <Text />
    );
  };

  return (
    <Animated.View
      style={{
        ...styles.mainContainer,
        ...getContainerCss(),
        ...{transform: [{translateY: slideAnim}]},
      }}>
      <View style={{...styles.menuContainer}}>{getDevContent()}</View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}>
        <NewPlayerInput />

        <TouchableOpacity
          onPress={() => {
            deletePLayers();
          }}>
          <Icon name="refresh" size={30} color="#000" />
          <Text>Reset</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.operationPickerContainer}>
        <Text>Operation</Text>
        <Picker
          selectedValue={operation}
          onValueChange={(itemValue, _) => {
            updateOperation(itemValue);
          }}
          style={styles.operationPicker}
          prompt="Operation"
          dropdownIconColor="black">
          <Picker.Item
            label="Addition (Defaut)"
            value={constants.operations.ADD}
          />
          <Picker.Item label="Soustraction" value={constants.operations.SUB} />
        </Picker>
      </View>
      <View style={styles.operationPickerContainer}>
        <Text>Initial score</Text>

        <TextInput
          style={styles.inputStyle}
          keyboardType="numeric"
          value={initialScore !== 0 ? String(initialScore) : ''}
          onChangeText={score => {
            updateInitialScore(Number(score));
          }}
        />
      </View>

      <View style={styles.operationPickerContainer}>
        <Text>Target score</Text>
        <TextInput
          style={styles.inputStyle}
          keyboardType="numeric"
          value={targetScore !== 0 ? String(targetScore) : ''}
          onChangeText={score => {
            updateTargetScore(Number(score));
          }}
        />
      </View>

      <View style={{paddingBottom: 5.5}}>
        <StripeButton onPress={toggleMenu} />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#EDEDED',
    position: 'absolute',
    zIndex: 2,
    opacity: 1.0,
    height: menu_size,
    marginTop: '5%', // fix for notch. Temporary
    justifyContent: 'space-between',
  },
  menuContainerDeployed: {},
  menuContainerFolded: {},
  menuContainer: {},

  operationPickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: constants.windowWidth * 0.8,
    marginTop: constants.windowHeight * 0.01,
  },
  operationPicker: {
    height: 50,
    width: 200,
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    justifyContent: 'center',
    color: 'black',
  },
  inputStyle: {
    height: 50,
    width: 200,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: constants.mediumFont,
    backgroundColor: '#f9f9f9',
  },
});

//<View style={{backgroundColor: 'red', height: 400, width: constants.windowWidth / 2, position: 'absolute'}}></View>
