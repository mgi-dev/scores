import React from 'react';
import {TouchableOpacity, StyleSheet, ViewStyle} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface EditIconProps {
  style?: ViewStyle;
  iconStyle?: ViewStyle;
  onPress?: () => void;
}

export const ResetIcon = ({ style, iconStyle, onPress }: EditIconProps) => {
  return (
    <TouchableOpacity style={[styles.actionButton, style]} onPress={onPress}>
      <Icon style={iconStyle} name="refresh" size={24} color="#fff" />
    </TouchableOpacity>
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
