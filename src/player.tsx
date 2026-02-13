import React from 'react';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Animated,
} from 'react-native';
import {constants} from './constants';
import {useStore, GameStore} from './service/store';
import {PlayerData} from './service/interfaces';
import {updateScore} from './service/score_service';
import {usePlayerScoreContext} from './context/PlayerContext';
import { HiddenPlayerMenu } from './component/hiddenPlayerMenu';

const playerWidgetBorderRadius = 8; // to smooth the edges of player widget.
const playerWidgetWidth = constants.windowWidth * 0.90;



export const Player = ({
  playerData,
  operation,
  slideX,
}: {
  playerData: PlayerData;
  operation: string; // impact style and calculus behaviour
  slideX: Animated.Value;
}) => {
  const {score, setScore, addedScore, setAddedScore} = usePlayerScoreContext();

  const resetPlayerScore = () => {
    setScore('0');
    setAddedScore('0');
  };

  // Data is partially in store. A decision must be made.
  // Get rid of the store or do everything in it even for nothing ?

  const deletePlayer = useStore((state: GameStore) => state.deletePlayer);

  const handleSubmit = () => {
    // this doesn't make any sense.
    setScore(updateScore(score, addedScore, operation));
    setAddedScore('0');
  };

  return (
    <View style={playerStyles.mainContainer}>
      <HiddenPlayerMenu
        onReset={()=> {
          resetPlayerScore();
        }}
        onDelete={()=>{deletePlayer(playerData);}}
        customBorderRadius={8}
      />
      <Animated.View
        style={{
          transform: [{translateX: slideX}],
        }}>
        <View
          style={[
            playerStyles.playerWidgetContainer,
            operation === constants.operations.ADD ? playerStyles.addWidgetContainer : playerStyles.substractWidgetContainer,
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
              value={addedScore !== '0' ? addedScore : ''}
            />
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

const playerStyles = StyleSheet.create({
  mainContainer: {
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
  addWidgetContainer: {
    backgroundColor: '#dff8f7',
  },
  substractWidgetContainer: {
    backgroundColor: '#f8ecec',
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
});
