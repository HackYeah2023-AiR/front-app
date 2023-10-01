import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { CameraScreen } from './CameraScreen';
import { Form } from './Form';

export type MainStackParams = {
  CameraScreen: undefined;
  Form: undefined;
};

const Stack = createStackNavigator();

export const AddImage: React.FC = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'CameraScreen' }],
      });
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CameraScreen"
        options={{ headerShown: false }}
        component={CameraScreen}
      />
      <Stack.Screen
        name="Form"
        options={{ headerShown: false }}
        component={Form}
      />
    </Stack.Navigator>
  );
};
