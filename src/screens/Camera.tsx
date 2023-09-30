import React, { useRef, useEffect, useState, useCallback } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { useIsFocused } from '@react-navigation/native';
import colors from '../constants/colors';

export const CameraScreen = () => {
  const [type, setType] = useState(CameraType.back);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const cameraRef = useRef<Camera>(null);
  const isFocused = useIsFocused(); // Get the focus state of the screen

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const toggleCameraType = useCallback(() => {
    setType(current =>
      current === CameraType.back ? CameraType.front : CameraType.back,
    );
  }, []);

  const takePicture = useCallback(async () => {
    if (cameraRef.current) {
      try {
        const { uri } = await cameraRef.current.takePictureAsync({});
        console.log('Picture taken:', uri);
      } catch (error) {
        console.error('Error taking picture:', error);
      }
    }
  }, []);

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  if (!isFocused) {
    return <ActivityIndicator size="large" color={colors.orange} />;
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} ref={cameraRef} />
      <TouchableOpacity style={styles.takePictureButton} onPress={takePicture}>
        <View style={styles.takePictureButtonLabel} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
  },
  camera: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  takePictureButton: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    borderRadius: 40,
    backgroundColor: 'transparent', // Set background color to transparent
    borderColor: 'white',
    borderWidth: 3,
    bottom: 20,
    left: (Dimensions.get('window').width - 82) / 2,
  },
  takePictureButtonLabel: {
    padding: 33,
    borderRadius: 40,
    backgroundColor: colors.red,
  },
});
