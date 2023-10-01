import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import * as ExpoLocation from 'expo-location';
import colors from '../../constants/colors';
import { POST_ANIMAL } from '../../api/api';
import { AnimalRequest } from '../../api/model';
import { UserLocation } from '../google-map/types';
import { convertImageToBlob } from '../../utils/utils';

export const Form = ({ navigation, route }) => {
  const { imageUri } = route.params;
  const [selectedLabel, setSelectedLabel] = useState('dog');
  const [location, setLocation] = useState<UserLocation | null>(null);

  useEffect(() => {
    const getLocation = async () => {
      const { status } = await ExpoLocation.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      const currentLocation = await ExpoLocation.getCurrentPositionAsync({}); // Renamed variable to currentLocation

      setLocation({
        latitude: currentLocation?.coords?.latitude,
        longitude: currentLocation?.coords?.longitude,
      });
    };

    getLocation();
  }, []);

  const handleSubmit = useCallback(() => {
    convertImageToBlob(imageUri).then(blob => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result as string;

        const formData: AnimalRequest = {
          latitude: location?.latitude ?? 0,
          longitude: location?.longitude ?? 0,
          date: new Date().toISOString(),
          isLost: false,
          image: base64data,
          speciesName: selectedLabel,
        };

        axios.post(POST_ANIMAL, formData);
      };
      reader.readAsDataURL(blob);
    });

    navigation.navigate('CameraScreen');
  }, [navigation, selectedLabel, imageUri, location]);

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUri }} style={styles.image} />
      <Text style={styles.title}>Animal</Text>
      <Picker
        selectedValue={selectedLabel}
        onValueChange={itemValue => setSelectedLabel(itemValue)}
        style={styles.picker}
      >
        <Picker.Item style={styles.pickerItem} label="Dog" value="dog" />
        <Picker.Item style={styles.pickerItem} label="Cat" value="cat" />
        <Picker.Item style={styles.pickerItem} label="Bear" value="bear" />
        <Picker.Item style={styles.pickerItem} label="Deer" value="deer" />
        <Picker.Item style={styles.pickerItem} label="Boar" value="boar" />
      </Picker>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center', // Center children horizontally
    justifyContent: 'center', // Center children vertically
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30,
  },
  picker: {
    height: 50,
    width: 300,
    marginBottom: 40,
  },
  pickerItem: {
    fontSize: 24,
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
    borderRadius: 10,
  },
  button: {
    borderColor: colors.orange,
    color: colors.orange,
    borderRadius: 30,
    padding: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 3,
  },
  buttonText: {
    color: colors.orange,
    fontSize: 32,
    fontWeight: 'bold',
  },
});
