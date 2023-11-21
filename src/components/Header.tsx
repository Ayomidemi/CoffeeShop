import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';
import GradientIcon from './GradientIcon';
import ProfilePicture from './ProfilePicture';

type Props = {
  title?: string;
};

const Header = ({title}: Props) => {
  return (
    <View style={styles.HeaderContainer}>
      <GradientIcon
        name="menu"
        color={COLORS.primaryLightGreyHex}
        size={FONTSIZE.size_16}
      />
      <Text style={styles.HeaderText}>{title}</Text>
      <ProfilePicture />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  HeaderContainer: {
    padding: SPACING.space_30,
    marginTop: SPACING.space_24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  HeaderText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_20,
    color: COLORS.primaryWhiteHex,
  },
});
