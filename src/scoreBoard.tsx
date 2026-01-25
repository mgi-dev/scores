import React from 'react';
import {ScrollView, Text, View, StyleSheet} from 'react-native';

import {GameStore, useStore} from './services/store';
import {PlayerData} from './services/interfaces';
import {constants} from './constants';
import {NewPlayerInputV3} from './NewPlayerInputV3';
import {DeletePlayersButton} from './DeletePlayersButton';
import {AddDebugPlayersButton} from './AddDebugPlayersButton';
import {PlayerFlipWidget} from './component/PlayerFlipWidget';
import {PressableIcon} from './component/icon/PressableIcon';


const SCROLL_STEP_SIZE = constants.windowHeight * 0.33;

export const ScoreBoard = () => {
  const playersData = useStore((state: GameStore) => state.playersData);
  const scrollRef = React.useRef<ScrollView | null>(null);
  const probableScrollPosition = React.useRef(0);
  const playerListContentHeigth = React.useRef(0);

  const scrollDown = () => {
    console.log(
      probableScrollPosition.current,
      '/',
      playerListContentHeigth.current,
    );

    // Need to prevent user from scrolling too far. doesn't work yet.
    if (
      probableScrollPosition.current + SCROLL_STEP_SIZE <
      playerListContentHeigth.current
    ) {
      probableScrollPosition.current += SCROLL_STEP_SIZE;
      scrollRef.current?.scrollTo({
        y: probableScrollPosition.current,
        animated: true,
      });
    } else {
      probableScrollPosition.current = playerListContentHeigth.current;
      scrollRef.current?.scrollToEnd({animated: true});
    }
  };

  const scrollUp = () => {
    console.log(probableScrollPosition.current);
    if (probableScrollPosition.current > 0) {
      probableScrollPosition.current -= SCROLL_STEP_SIZE;
    } else {
      probableScrollPosition.current = 0;
    }

    scrollRef.current?.scrollTo({
      y: probableScrollPosition.current,
      animated: true,
    });
  };

  const getScrollUpIcon = () => {
    return playersData.length > 4 ? (
      <PressableIcon name="chevron-up" onPress={scrollUp} />
    ) : null;
  };

  const getScrollDownIcon = () => {
    return playersData.length > 4 ? (
      <PressableIcon name="chevron-down" onPress={scrollDown} />
    ) : null;
  };

  const getDevContent = () => {
    return __DEV__ ? (
      <View>
        <AddDebugPlayersButton />
        <DeletePlayersButton />
      </View>
    ) : (
      <Text />
    );
  };

  return (
    <View style={styles.mainContainer}>
      {getScrollUpIcon()}
      <View style={styles.scrollViewContainer}>
        <ScrollView
          ref={scrollRef}
          scrollEnabled={false}
          onContentSizeChange={(_, height) => {
            playerListContentHeigth.current = height;
          }}
          keyboardShouldPersistTaps="handled"

          contentContainerStyle={styles.playerListContainer}>
          {playersData.map((item: PlayerData) => (
              <PlayerFlipWidget key={item.key} playerData={item} />
          ))}
          {getDevContent()}
          <NewPlayerInputV3 />
        </ScrollView>
      </View>
      {getScrollDownIcon()}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: constants.windowHeight * 0.94,
    width: constants.windowWidth * 0.94,
    alignSelf: 'center',

  },
  scrollViewContainer: {
    height: '80%',
  },
  playerListContainer: {

  },
});
