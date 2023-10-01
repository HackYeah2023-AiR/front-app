import React, { useState } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import colors from '../../constants/colors';

export const Form = ({ route }) => {
  const { imageUri } = route.params;
  const [selectedLabel, setSelectedLabel] = useState('Option 1');

  const handleSubmit = () => {
    console.log('Submitted:', selectedLabel);
    console.log(imageUri);
  };

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
