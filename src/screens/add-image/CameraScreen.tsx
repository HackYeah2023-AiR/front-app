import React, { useRef, useEffect, useState, useCallback } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { Camera } from 'expo-camera';
import {
  PinchGestureHandler,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native';
import colors from '../../constants/colors';

export const CameraScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [zoom, setZoom] = useState(0);
  const cameraRef = useRef<Camera>(null);
  const isFocused = useIsFocused(); // Get the focus state of the screen
  const [uri, setUri] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const lastScaleRef = useRef(1);
  const lastZoomRef = useRef({ lastCallTime: 0, zoom: 0 });

  const onPinch = useCallback(event => {
    const { scale } = event.nativeEvent;

    // Throttle the function to ensure it's not called too frequently
    const now = Date.now();
    if (now - lastZoomRef.current.lastCallTime > 100) {
      requestAnimationFrame(() => {
        // Linear interpolation to smooth out the zooming effect
        const smoothScale =
          lastScaleRef.current + (scale - lastScaleRef.current) * 0.1;
        setZoom(prevZoom => {
          const newZoom = Math.min(
            Math.max(prevZoom + (smoothScale - 1), 0),
            1,
          );
          lastZoomRef.current = { lastCallTime: now, zoom: newZoom };
          lastScaleRef.current = smoothScale;
          return newZoom;
        });
      });
    }
  }, []);

  const takePicture = useCallback(async () => {
    if (cameraRef.current) {
      try {
        const { uri: URI } = await cameraRef.current.takePictureAsync({});
        console.log('Picture taken:', URI);
        setUri(URI);
      } catch (error) {
        console.error('Error taking picture:', error);
      }
    }
  }, []);

  useEffect(() => {
    if (uri) {
      navigation.navigate('Form', { imageUri: uri });
    }
  }, [uri, navigation]);

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
    <GestureHandlerRootView style={styles.container}>
      <PinchGestureHandler
        onGestureEvent={onPinch}
        onHandlerStateChange={onPinch}
      >
        <Camera style={styles.camera} ref={cameraRef} zoom={zoom} />
      </PinchGestureHandler>
      <TouchableOpacity style={styles.takePictureButton} onPress={takePicture}>
        <View style={styles.takePictureButtonLabel} />
      </TouchableOpacity>
    </GestureHandlerRootView>
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
