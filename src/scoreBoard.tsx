import React from 'react';
import {ScrollView, Text, View, StyleSheet, Button} from 'react-native';
import {Player} from './player';

import {Menu} from './menu';
import {GameStore, useStore} from './services/store';
import {PlayerData} from './services/interfaces';
import {constants} from './constants';
import {NewPlayerInputV3} from './NewPlayerInputV3';
import {DeletePlayersButton} from './DeletePlayersButton';
import {AddDebugPlayersButton} from './AddDebugPlayersButton';
import {Flip} from './component/Flip';
import { PressableIcon } from './component/icon/PressableIcon';
// import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';


const SCROLL_STEP_SIZE = constants.windowHeight * 0.33

export const ScoreBoard = () => {
  const playersData = useStore((state: GameStore) => state.playersData);
  const scrollRef = React.useRef<ScrollView | null>(null);
  const probableScrollPosition = React.useRef(0);
  const playerListContentHeigth = React.useRef(0);

  const scrollDown = () => {
    
    console.log(probableScrollPosition.current , '/', playerListContentHeigth.current)
    
    // don't get it. Need sleep.
    if (probableScrollPosition.current + SCROLL_STEP_SIZE < playerListContentHeigth.current){
      probableScrollPosition.current += SCROLL_STEP_SIZE
      scrollRef.current?.scrollTo({y: probableScrollPosition.current, animated: true});
    }else{
      probableScrollPosition.current = playerListContentHeigth.current
      scrollRef.current?.scrollToEnd({animated: true});
    }
  }

  const scrollUp = () => {
    console.log(probableScrollPosition.current)
    if (probableScrollPosition.current > 0){
      probableScrollPosition.current -= SCROLL_STEP_SIZE
    } else {
      probableScrollPosition.current = 0
    }

    scrollRef.current?.scrollTo({y: probableScrollPosition.current, animated: true});
  }

  const getScrollUpIcon = () => {
    return playersData.length > 4 ? (
      <PressableIcon name='toto' onPress={scrollUp}/>
    ) : (
      null
    );
  };


  const getScrollDownIcon = () => {
    return playersData.length > 4 ? (
      <PressableIcon name='toto' onPress={scrollDown}/>
    ) : (
      null
    );
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
    <View style={{borderColor:'dark', borderWidth:1}}>
      {getScrollUpIcon()}
      
      <Text />
      <Text />
      
      
      <View style={{height: '60%'}}>
        <ScrollView
          ref={scrollRef}
          scrollEnabled={false}
            onContentSizeChange={(_, height) => {
            playerListContentHeigth.current = height;
          }}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.playerListContainer}>
          {playersData.map((item: PlayerData) => (
            <View key={item.key} style={{marginBottom: 12}}>
              <Player playerData={item} />
            </View>
          ))}
          {getDevContent()}
          <NewPlayerInputV3 />
        </ScrollView>
      </View>
      <Flip />
      {getScrollDownIcon()}
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
