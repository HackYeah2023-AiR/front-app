import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import colors from '../../constants/colors';
import { PetMaps } from './PetsMap';
import * as ExpoLocation from 'expo-location';
import { AnimalRequest } from '../../api/model';
import { UserLocation } from '../google-map/types';
import { convertImageToBlob } from '../../utils/utils';
import axios from 'axios';
import { POST_ANIMAL } from '../../api/api';

export const Form = ({ navigation }) => {
  const [image, setImage] = useState<string | null>(null);
  const [date, setDate] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [location, setLocation] = useState(null);
  const [selectedLabel, setSelectedLabel] = useState('dog');
  const [customLocation, setCustomLocation] = useState<UserLocation | null>(
    null,
  );

  useEffect(() => {
    const getLocation = async () => {
      const { status } = await ExpoLocation.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      const currentLocation = await ExpoLocation.getCurrentPositionAsync({}); // Renamed variable to currentLocation

      setCustomLocation({
        latitude: currentLocation?.coords?.latitude,
        longitude: currentLocation?.coords?.longitude,
      });
    };

    getLocation();
  }, []);

  const handleLocationSelect = useCallback(selectedLocation => {
    setLocation(selectedLocation);
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleButtonCLick = () => {
    convertImageToBlob(image).then(blob => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result as string;

        const formData: AnimalRequest = {
          latitude: customLocation?.latitude ?? 0,
          longitude: customLocation?.longitude ?? 0,
          date: new Date().toISOString(),
          isLost: true,
          image: base64data,
          speciesName: selectedLabel,
        };

        axios.post(POST_ANIMAL, formData);
      };
      reader.readAsDataURL(blob);
      navigation.navigate('LostPets');
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImage}>
        <View style={styles.selectBox}>
          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <View style={styles.imageIconBox}>
              <Ionicons name="image" size={24} color="black" />
              <Text style={styles.selectImage}>Select Image</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
      <Text style={styles.text}>Animal</Text>
      <View style={styles.pickerView}>
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
      </View>
      <Text style={styles.text}>Last Location</Text>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <View style={styles.locationBox}>
          <Ionicons name="location-sharp" size={24} color="black" />
          <TextInput
            placeholder="Select location"
            value={
              location
                ? `${location.latitude.toFixed(
                    4,
                  )}, ${location.longitude.toFixed(4)}`
                : ''
            }
            editable={false}
            style={styles.locationBoxText}
          />
        </View>
      </TouchableOpacity>
      <Text style={styles.text}>Disappearance Date</Text>
      <TextInput
        style={styles.textInput}
        value={date}
        onChangeText={setDate}
        placeholder="Write disappearance date"
      />
      <TouchableOpacity style={styles.button} onPress={handleButtonCLick}>
        <Text style={styles.buttonText}>Find</Text>
      </TouchableOpacity>
      <PetMaps
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSelect={handleLocationSelect}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    borderColor: colors.orange,
    borderWidth: 3,
  },
  imageIconBox: {
    borderColor: colors.gray,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
  },
  pickerView: {
    borderRadius: 10,
    borderColor: colors.gray,
    borderWidth: 1,
    overflow: 'hidden',
  },
  picker: {
    height: 40,
    width: 300,
    backgroundColor: 'white',
  },
  pickerItem: {
    fontSize: 16,
  },
  selectBox: {
    marginBottom: 20,
  },
  selectImage: {
    fontSize: 30,
    color: colors.orange,
  },
  locationBox: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'flex-start',
    padding: 10,
    width: 300,
    borderColor: colors.gray,
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
  },
  locationBoxText: {
    fontSize: 20,
    color: colors.gray,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.gray,
    marginBottom: 10,
  },
  textInput: {
    height: 50,
    borderColor: colors.gray,
    backgroundColor: 'white',
    borderWidth: 1,
    width: 300,
    marginBottom: 20,
    paddingLeft: 10,
    fontSize: 20,
    borderRadius: 10,
    color: colors.gray,
  },
  button: {
    width: 150,
    height: 57,
    backgroundColor: 'white',
    borderRadius: 30,
    borderWidth: 3,
    borderColor: colors.orange,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    textAlign: 'center',
    color: colors.orange,
    fontSize: 32,
    fontWeight: '800',
  },
});
