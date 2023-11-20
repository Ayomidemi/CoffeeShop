import {StyleSheet, View} from 'react-native';
import React from 'react';
import {SPACING, BORDERRADIUS} from '../theme/theme';
import CustomIcon from './CustomIcon';

type Props = {
  name: string;
  color: string;
  size: number;
  BGColor: string;
};

const BGIcon = ({name, color, size, BGColor}: Props) => {
  return (
    <View style={[styles.IconBG, {backgroundColor: BGColor}]}>
      <CustomIcon name={name} color={color} size={size} />
    </View>
  );
};

export default BGIcon;

const styles = StyleSheet.create({
  IconBG: {
    height: SPACING.space_30,
    width: SPACING.space_30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: BORDERRADIUS.radius_8,
  },
});
