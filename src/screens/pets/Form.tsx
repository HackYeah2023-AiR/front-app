import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import colors from '../../constants/colors';
import { PetMaps } from './PetsMap';

export const Form = ({ navigation }) => {
  const [image, setImage] = useState<string | null>(null);
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [location, setLocation] = useState(null);

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

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleButtonCLick = () => {
    console.log('Form submitted:', { text1, text2, image });
    navigation.navigate('LostPets');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImage}>
        <View style={styles.selectBox}>
          {image ? (
            <Image
              source={{ uri: image }}
              style={{ width: 200, height: 200 }}
            />
          ) : (
            <Text style={styles.selectImage}>Select Image</Text>
          )}
        </View>
      </TouchableOpacity>
      <Text style={styles.text}>Last Location</Text>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <TextInput
          placeholder="Select location"
          value={location ? `${location.latitude}, ${location.longitude}` : ''}
          editable={false}
          style={{ borderBottomWidth: 1, width: 200, textAlign: 'center' }}
        />
      </TouchableOpacity>
      <Text style={styles.text}>Disappearance Date</Text>
      <TextInput
        style={styles.textInput}
        value={text2}
        onChangeText={setText2}
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
  selectBox: {
    marginBottom: 20,
  },
  selectImage: {
    fontSize: 30,
    color: colors.blue,
  },
  text: {
    fontSize: 20,
    color: colors.gray,
    marginTop: 30,
  },
  textInput: {
    height: 50,
    borderColor: colors.gray,
    backgroundColor: 'white',
    borderWidth: 1,
    width: '80%',
    marginBottom: 20,
    paddingLeft: 10,
    fontSize: 20,
    borderRadius: 10,
    color: colors.gray,
  },
  button: {
    width: 148,
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
