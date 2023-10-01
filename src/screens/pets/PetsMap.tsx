// MapModal.js
import React, { useState, useCallback } from 'react';
import { Modal, View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import colors from '../../constants/colors';

export const PetMaps = ({ visible, onClose, onSelect }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleMapPress = useCallback(event => {
    setSelectedLocation(event.nativeEvent.coordinate);
  }, []);

  const handleConfirm = () => {
    onSelect(selectedLocation);
    onClose();
  };

  return (
    <Modal visible={visible} onRequestClose={onClose}>
      <View style={{ flex: 1 }}>
        <GooglePlacesAutocomplete
          placeholder="Search"
          onPress={(data, details = null) => {
            const location = details.geometry.location;
            setSelectedLocation({
              latitude: location.lat,
              longitude: location.lng,
            });
          }}
          query={{
            key: 'AIzaSyBkEmCeKnrEDmZ-Ha5Ol8mBzG9GJXPaVBA',
            language: 'en',
          }}
          currentLocation
          styles={{
            container: {
              position: 'absolute',
              top: 0,
              width: '100%',
            },
          }}
        />
        <MapView
          style={{ flex: 1 }}
          onPress={handleMapPress}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {selectedLocation && (
            <Marker coordinate={selectedLocation} draggable />
          )}
        </MapView>
        <TouchableOpacity style={styles.button1} onPress={handleConfirm}>
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button2} onPress={onClose}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  button1: {
    width: 100,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 30,
    borderWidth: 3,
    borderColor: colors.orange,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  button2: {
    width: 100,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 30,
    borderWidth: 3,
    borderColor: colors.orange,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
  buttonText: {
    textAlign: 'center',
    color: colors.orange,
    fontSize: 24,
    fontWeight: '800',
  },
});
