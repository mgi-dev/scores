/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  View,
  Text
} from 'react-native';

import {ScoreBoard} from './src/scoreBoard';




function App(): React.JSX.Element {

  const backgroundStyle = {
    backgroundColor: 'white',
    flex: 1,
  };


  return (
    <View style={backgroundStyle}>
      <ScoreBoard />
    </View>
  );
}


export default App;
