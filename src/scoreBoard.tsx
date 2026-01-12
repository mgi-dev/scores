import React from 'react';
import {ScrollView, Text, View, StyleSheet} from 'react-native';
import {Player} from './player';

import {Menu} from './menu';
import {GameStore, useStore} from './services/store';
import {PlayerData} from './services/interfaces';
import {constants} from './constants';
import {NewPlayerInputV3} from './NewPlayerInputV3';
import {DeletePlayersButton} from './DeletePlayersButton';
import {AddDebugPlayersButton} from './AddDebugPlayersButton';
import { Flip } from './component/Flip';

export const ScoreBoard = () => {
  const playersData = useStore((state: GameStore) => state.playersData);

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
    <View>
      <Menu />
      <Text />
      <Text />
      {/* <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.playerListContainer}>
        {playersData.map((item: PlayerData) => (
          <View key={item.key} style={{marginBottom: 12}}>
            <Player playerData={item} />
          </View>
        ))}
        {getDevContent()}
        <NewPlayerInputV3 />
      </ScrollView> */}
        <Flip/>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {},
  playerListContainer: {
    paddingVertical: constants.windowHeight * 0.02,
    paddingBottom: constants.windowHeight * 0.4,
  },
});
