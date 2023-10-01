import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LostPets } from './LostPets';
import { Form } from './Form';

export const Pets: React.FC = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LostPets"
        options={{ headerShown: false }}
        component={LostPets}
      />
      <Stack.Screen
        name="Form"
        options={{ headerShown: false }}
        component={Form}
      />
    </Stack.Navigator>
  );
};
