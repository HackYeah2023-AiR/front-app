import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  Ionicons,
  MaterialIcons,
  Feather,
  AntDesign,
} from '@expo/vector-icons';
import { GoogleMap, AddImage, Pets } from './screens';
import colors from './constants/colors';
// import LogoIcon from '../assets/logo.png';
const Tab = createBottomTabNavigator();

const CustomHeader = () => (
  <View style={styles.header}>
    <View style={styles.headerLogoBlock}>
      <Image source={require('../assets/logo.png')} style={styles.headerLogo} />
      <Text style={styles.headerText}>AnimalTracker</Text>
    </View>
  </View>
);

const MapScreen = () => (
  <View style={styles.container}>
    <GoogleMap />
  </View>
);

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="auto" />
      <NavigationContainer>
        <CustomHeader />
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ focused }) => {
              if (route.name === 'Pets') {
                return (
                  <MaterialIcons
                    name="pets"
                    size={28}
                    color={focused ? colors.orange : colors.gray}
                  />
                );
              }
              if (route.name === 'AddImage') {
                return (
                  <Ionicons
                    name="add-circle"
                    size={40}
                    color={focused ? colors.orange : colors.gray}
                  />
                );
              }
              if (route.name === 'Map') {
                return (
                  <Feather
                    name="map-pin"
                    size={28}
                    color={focused ? colors.orange : colors.gray}
                  />
                );
              }
              return (
                <AntDesign
                  name="exclamationcircle"
                  size={24}
                  color={focused ? colors.orange : colors.gray}
                />
              );
            },
            tabBarStyle: {
              height: 78,
            },
            tabBarLabel: () => null,
          })}
        >
          <Tab.Screen name="Pets" component={Pets} />
          <Tab.Screen name="AddImage" component={AddImage} />
          <Tab.Screen name="Map" component={MapScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerLogoBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLogo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginRight: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.orange,
  },
  headerIconButton: {
    padding: 5,
  },
  footer: {
    height: 70,
    backgroundColor: '#f8f8f8',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  footerText: {
    fontSize: 18,
  },
});
