import React from 'react';
import {TouchableOpacity, StyleSheet, ViewStyle} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface EditIconProps {
  name: string;
  style?: ViewStyle;
  iconStyle?: ViewStyle;
  onPress?: () => void;
}

// Make all icons reuse Pressable Icon for shiny DRY.

export const PressableIcon = ({ name, style, iconStyle, onPress }: EditIconProps) => {
  return (
    <TouchableOpacity style={[styles.actionButton, style]} onPress={onPress}>
      <Icon style={iconStyle} name={name} size={24}/>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  actionButton: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
});
