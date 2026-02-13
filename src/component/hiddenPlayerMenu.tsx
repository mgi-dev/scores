import React from 'react';
import {View, StyleSheet} from 'react-native';
import { ResetIcon } from './icon/ResetIcon';
import { DeleteIcon } from './icon/DeleteIcon';


interface HiddenPlayerMenuProps {
  customBorderRadius?: number;
  onReset: () => void;
  onDelete: () => void;
}


export const HiddenPlayerMenu = ({ customBorderRadius, onReset, onDelete }: HiddenPlayerMenuProps) => {
    /* Hidden menu behind player widget, revealed by panResponder */
  
    const borderRadiusStyle = {
        borderBottomRightRadius: customBorderRadius ? customBorderRadius: 0,
        borderTopRightRadius: customBorderRadius ? customBorderRadius: 0,
    }

    return (
      <View style={styles.actionContainer}>
        <ResetIcon onPress={onReset}/>
        <DeleteIcon onPress={onDelete} style={borderRadiusStyle}/>
      </View>
  );
};

const styles = StyleSheet.create({
  actionContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
    zIndex: -1,
  },
});
