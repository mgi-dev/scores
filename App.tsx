/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {ScoreBoard} from './src/ScoreBoard';
import { SafeAreaView } from 'react-native-safe-area-context';




function App(): React.JSX.Element {

  const backgroundStyle = {
    backgroundColor: '#E6F5FB',
    flex: 1,
  };


  return (
    <SafeAreaView style={backgroundStyle}>
      <ScoreBoard />
    </SafeAreaView>
  );
}


export default App;
