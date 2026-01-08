import React from 'react';
import {TouchableOpacity, StyleSheet, ViewStyle, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface EditIconProps {
  style?: ViewStyle;
  iconStyle?: ViewStyle;
  onPress?: () => void;
}

export const ResetIcon = ({ style, iconStyle, onPress }: EditIconProps) => {
  return (
    <View style={{alignSelf: 'center'}}>
      <TouchableOpacity onPress={onPress}>
        <Icon style={iconStyle} name="refresh" size={30} color="#000" />
        <Text>Reset</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  actionButton: {
    width: 60,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1976d2',
  },
});
