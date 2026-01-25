import React from 'react';
import {TouchableOpacity, StyleSheet, ViewStyle} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface DeleteIconProps {
  style?: ViewStyle;
  iconStyle?: ViewStyle;
  onPress?: () => void;
}

export const DeleteIcon = ({ style, iconStyle, onPress }: DeleteIconProps) => {
  return (
    <TouchableOpacity style={[styles.actionButton, style]} onPress={onPress}>
      <Icon style={iconStyle} name="delete" size={24} color="#fff" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  actionButton: {
    width: 60,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e53935',
  },
});
