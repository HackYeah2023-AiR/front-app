/* eslint-disable prettier/prettier */
/* eslint-disable no-nested-ternary */
/* eslint-disable prettier/prettier */
import React, { useCallback } from 'react';
import { Marker } from 'react-native-maps';
import { View, Image, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import colors from '../../constants/colors';
import { MarkerItemProps } from './types';

export const MarkerItem = ({
  index,
  imageSource,
  latitude,
  longitude,
  handleMarkerPress: handleMarkerPressFromProps,
}: MarkerItemProps) => {
  const handleMarkerPress = useCallback(() => {
    handleMarkerPressFromProps(index);
  }, [handleMarkerPressFromProps, index]);

  return (
    <>
      <Marker
        coordinate={{
          latitude,
          longitude,
        }}
        onPress={handleMarkerPress} // Added onPress prop to handle click event
      >
        <View style={styles.markerWrapper}>
          <Image source={imageSource} style={{ width: 60, height: 60 }} />
          <AntDesign
            name="infocirlceo"
            size={18}
            color="black"
            style={styles.infoIcon}
          />
        </View>
      </Marker>
    </>
  );
};

const styles = StyleSheet.create({
  markerWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoIcon: {
    position: 'absolute',
    backgroundColor: colors.whiteGray,
    borderRadius: 20,
    right: 0,
    top: 0,
  },
});
