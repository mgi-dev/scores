import React, {useState, useRef} from 'react';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Animated,
  PanResponder,
} from 'react-native';
import {constants} from './constants';
import {useStore, GameStore} from './services/store';
import {PlayerData} from './services/interfaces';
import {DeleteIcon} from './component/icon/DeleteIcon';
import {ResetIcon} from './component/icon/ResetIcon';
import { updateScore } from './services/score_service';

const playerWidgetBorderRadius = 8; // to smooth the edges of player widget.

  export const Player = ({playerData, operation}: {playerData: PlayerData, operation: string}) => {
  const [addedScore, setAddedScore] = useState(0);
  const [score, setScore] = useState(0);
  
  const resetPlayerScore = () => {
    setScore(0)
  }

// Data is partially in store. A decision must be made.
// Get rid of the store or do everything in it even for nothing ?

  const deletePlayer = useStore((state: GameStore) => state.deletePlayer);


  const slideX = useRef(new Animated.Value(0)).current;
  const actionWidth = 120; // width for the action buttons
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) =>
        Math.abs(gestureState.dx) > 10,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dx < 0) {
          slideX.setValue(Math.max(gestureState.dx, -actionWidth));
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx < -actionWidth / 2) {
          Animated.spring(slideX, {
            toValue: -actionWidth,
            useNativeDriver: true,
          }).start();
        } else {
          Animated.spring(slideX, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    }),
  ).current;

  
  const handleSubmit = () => {
    // this doesn't make any sense.
    setScore(updateScore(score, addedScore, operation))
    setAddedScore(0);
  };

  return (
    <View style={{margin: constants.windowHeight * 0.02}}>
      {/* Action buttons behind */}
      <View style={playerStyles.actionContainer}>
        <ResetIcon
          onPress={() => {
            resetPlayerScore();
            setAddedScore(0);
          }}
        />
        <DeleteIcon
          onPress={() => deletePlayer(playerData)}
          style={{
            borderBottomRightRadius: playerWidgetBorderRadius,
            borderTopRightRadius: playerWidgetBorderRadius,
          }}
        />
      </View>
      {/* Main player card slides over */}
      <Animated.View
        style={{
          transform: [{translateX: slideX}],
        }}
        {...panResponder.panHandlers}>
        <View style={[playerStyles.mainContainer, {
          backgroundColor: operation === constants.operations.ADD ? '#f5f5f5': '#E1BBBB'
          }]}>
          <Text
            style={{
              ...playerStyles.playerName,
              color: playerData.hasWon ? 'green' : 'black',
            }}>
            {playerData.name}
          </Text>
          <View style={playerStyles.scoreContainer}>
            <Text
              style={{
                ...playerStyles.score,
                color: playerData.hasWon ? 'green' : 'black',
              }}>
              {score}
            </Text>

            <TextInput
              style={playerStyles.scoreInput}
              keyboardType="numeric"
              onChangeText={text => {
                setAddedScore(Number(text));
              }}
              onSubmitEditing={handleSubmit}
              value={addedScore !== 0 ? String(addedScore) : ''}
            />
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

const playerStyles = StyleSheet.create({
  mainContainer: {
    // margin: constants.windowHeight * 0.02,
    borderWidth: 1,
    borderColor: 'rgb(177, 183, 185)',
    borderRadius: playerWidgetBorderRadius,
    paddingBottom: constants.windowHeight * 0.02,
    backgroundColor: '#f5f5f5',
  },
  scoreContainer: {
    flexDirection: 'row',
    width: constants.windowWidth,
    justifyContent: 'space-evenly',
  },
  playerName: {
    fontSize: constants.littleFont,
    paddingLeft: 10,
  },
  scoreInput: {
    width: constants.windowWidth * 0.2,
    borderColor: '#ccc',
    color: 'black',
    borderWidth: 1,

    backgroundColor: '#f9f9f9',
    alignSelf: 'center',
  },
  score: {
    fontSize: constants.bigFont,
  },
  actionContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    // margin: constants.windowHeight * 0.02,
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
    zIndex: -1,
  },
  actionButton: {
    width: 60,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
