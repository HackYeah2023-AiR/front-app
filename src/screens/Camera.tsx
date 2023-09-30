import React, { useRef, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Camera, CameraType } from 'expo-camera';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  button: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  buttonText: {
    fontSize: 18,
    color: 'black',
  },
});

export const CameraScreen = () => {
  const [type, setType] = useState(CameraType.back);
  const cameraRef = useRef<Camera>(null);

  function toggleCameraType() {
    setType(current =>
      current === CameraType.back ? CameraType.front : CameraType.back,
    );
  }
  async function takePicture() {
    if (cameraRef.current) {
      try {
        const { uri } = await cameraRef.current.takePictureAsync({});
        console.log('Picture taken:', uri);
      } catch (error) {
        console.error('Error taking picture:', error);
      }
    }
  }

  // @ts-ignore
  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type}>
        <View style={styles.buttonContainer}>
          {/* eslint-disable-next-line react/jsx-no-bind */}
          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <Text style={styles.buttonText}>Flip Camera</Text>
          </TouchableOpacity>
          {/* eslint-disable-next-line react/jsx-no-bind */}
          <TouchableOpacity style={styles.button} onPress={takePicture}>
            <Text style={styles.buttonText}>Take Picture</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
};
