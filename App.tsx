/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  useColorScheme,
  View,
} from 'react-native';

import {ScoreBoard} from './src/scoreBoard'


function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: "white",
    flex: 1
  };


  const safePadding = '5%';

  return (
    <View style={backgroundStyle}>
      <ScoreBoard />
    </View>
  );
}


export default App;
