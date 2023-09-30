/* eslint-disable prettier/prettier */
/* eslint-disable no-nested-ternary */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useCallback } from 'react';
import MapView from 'react-native-maps';
import { View, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import * as ExpoLocation from 'expo-location';
import { Logs } from 'expo';
import colors from '../../constants/colors';
import { MarkerItem } from './MarkerItem';
import { ModalItem } from './ModalItem';
import { UserLocation, UserInitialRegion, ItemProps } from './types';

Logs.enableExpoCliLogging();

const data: ItemProps[] = [
  {
    id: 1,
    imageSource: require('../../../assets/fox.png'),
    animalName: 'Fox',
    date: '23/10/2023',
    latitude: 50.0674778,
    longitude: 19.9916352,
  },
  {
    id: 2,
    imageSource: require('../../../assets/moose.png'),
    animalName: 'Moose',
    date: '24/10/2023',
    latitude: 51.0674778,
    longitude: 16.9916352,
  },
  {
    id: 3,
    imageSource: require('../../../assets/small_dog.png'),
    animalName: 'Dog',
    date: '21/10/2023',
    latitude: 49.0674778,
    longitude: 19.9916352,
  },
];

export const GoogleMap: React.FC = () => {
  const [location, setLocation] = useState<UserLocation | null>(null);
  const [initialRegion, setInitialRegion] = useState<UserInitialRegion | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState<ItemProps | null>(null);

  const handleOpenModal = useCallback((index: number) => {
    setModalData(data[index]);
    setOpenModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setOpenModal(false);
  }, []);

  useEffect(() => {
    const getLocation = async () => {
      const { status } = await ExpoLocation.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        setLoading(false);
        return;
      }

      const currentLocation = await ExpoLocation.getCurrentPositionAsync({}); // Renamed variable to currentLocation

      setLocation(currentLocation.coords);
      setInitialRegion({
        latitude: currentLocation?.coords?.latitude,
        longitude: currentLocation?.coords?.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });

      setLoading(false);
    };

    getLocation();
  }, []);

  console.log(location);
  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color={colors.orange} /> // Loader is displayed while loading
      ) : initialRegion ? (
        <MapView
          style={styles.map}
          initialRegion={initialRegion}
          showsUserLocation
          userLocationAnnotationTitle="You are here"
        >
          {data
            ? data.map((item, index) => {
                return (
                  <MarkerItem
                    key={item.id}
                    index={index}
                    handleMarkerPress={handleOpenModal}
                    imageSource={item.imageSource}
                    latitude={item.latitude}
                    longitude={item.longitude}
                  />
                );
              })
            : null}
        </MapView>
      ) : null}
      {modalData && (
        <ModalItem
          openModal={openModal}
          item={modalData}
          handleCloseModal={handleCloseModal}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
