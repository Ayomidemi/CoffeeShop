import React from 'react';
import {Image, StyleSheet, View} from 'react-native';

import {SPACING, COLORS} from '../theme/theme';

const ProfilePicture = () => {
  return (
    <View style={styles.ImageContainer}>
      <Image
        source={require('../assets/app_images/avater.jpeg')}
        style={styles.Image}
      />
    </View>
  );
};

export default ProfilePicture;

const styles = StyleSheet.create({
  ImageContainer: {
    height: SPACING.space_36,
    width: SPACING.space_36,
    borderRadius: SPACING.space_12,
    borderWidth: 2,
    borderColor: COLORS.secondaryDarkGreyHex,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  Image: {
    height: SPACING.space_36,
    width: SPACING.space_36,
  },
});
