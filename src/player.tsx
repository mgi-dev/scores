import React, {useRef} from 'react';
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
import {updateScore} from './services/score_service';
import {usePlayerScoreContext} from './context/PlayerContext';

const playerWidgetBorderRadius = 8; // to smooth the edges of player widget.
const playerWidgetWidth = constants.windowWidth * 0.90; // to smooth the edges of player widget.



export const Player = ({
  playerData,
  operation,
}: {
  playerData: PlayerData;
  operation: string; // impact style and calculus behaviour
}) => {
  const {score, setScore, addedScore, setAddedScore} = usePlayerScoreContext();

  const resetPlayerScore = () => {
    setScore("0");
  };

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
    setScore(updateScore(score, addedScore, operation));
    setAddedScore("0");
  };

  return (
    <View style={playerStyles.mainContainer}>
      <View style={playerStyles.actionContainer}>
        {/* Hidden menu behind player widget, revealed by panResponder */}
        <ResetIcon
          // TODO: smooth left edge.
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
      <Animated.View
        style={{
          transform: [{translateX: slideX}],
        }}
        {...panResponder.panHandlers}>
        <View
          style={[
            playerStyles.playerWidgetContainer,
            {
              backgroundColor:
                operation === constants.operations.ADD ? '#dff8f7' : '#f8ecec',
            },
          ]}>
          <Text style={playerStyles.playerName}>{playerData.name}</Text>
          <View style={playerStyles.scoreContainer}>
            <Text style={playerStyles.score}>{score}</Text>
            <TextInput
              style={playerStyles.scoreInput}
              keyboardType="numeric"
              onChangeText={text => {
                setAddedScore(text);
              }}
              onSubmitEditing={handleSubmit}
              // Weird condition is here to prevent the display of an immortal "0" on screen.
              value={addedScore !== "0" ? String(addedScore) : ''}
            />
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

const playerStyles = StyleSheet.create({
  mainContainer:{
    width: playerWidgetWidth,
    alignSelf: 'center',
  },
  playerWidgetContainer: {
    borderWidth: 1,
    borderColor: 'rgb(177, 183, 185)',
    borderRadius: playerWidgetBorderRadius,
    paddingBottom: constants.windowHeight * 0.02,
    backgroundColor: '#f5f5f5',
  },
  scoreContainer: {
    flexDirection: 'row',
    width: playerWidgetWidth,
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
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
    zIndex: -1,
  },
});
