import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
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
import { Main } from './navigation/Main';
import colors from './constants/colors';
// import LogoIcon from '../assets/logo.png';

const Tab = createBottomTabNavigator();

const HomeScreen = () => (
  <View style={styles.container}>
    <Text>Home Screen</Text>
  </View>
);

const SettingsScreen = () => (
  <View style={styles.container}>
    <Text>Settings Screen</Text>
  </View>
);

const CustomHeader = () => (
  <View style={styles.header}>
    <Image source={require('../assets/logo.png')} style={styles.logo} />
    <TouchableOpacity style={styles.iconButton}>
      <Ionicons name="menu" size={24} color="#000" />
    </TouchableOpacity>
  </View>
);

const ProfileScreen = () => (
  <View style={styles.container}>
    <Text>Profile Screen</Text>
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
            tabBarIcon: ({ focused }) => {
              if (route.name === 'Pets') {
                return (
                  <MaterialIcons
                    name="pets"
                    size={24}
                    color={focused ? colors.orange : colors.gray}
                  />
                );
              }
              if (route.name === 'AddImage') {
                return (
                  <Ionicons
                    name="add-circle"
                    size={30}
                    color={focused ? colors.orange : colors.gray}
                  />
                );
              }
              if (route.name === 'Map') {
                return (
                  <Feather
                    name="map-pin"
                    size={24}
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
            tabBarLabel: () => null,
          })}
        >
          <Tab.Screen name="Pets" component={HomeScreen} />
          <Tab.Screen name="AddImage" component={SettingsScreen} />
          <Tab.Screen name="Map" component={ProfileScreen} />
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
    height: 50,
    backgroundColor: '#f8f8f8',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerText: {
    fontSize: 18,
  },
  footer: {
    height: 50,
    backgroundColor: '#f8f8f8',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  logo: {
    width: 100,
    height: 40,
    resizeMode: 'contain',
  },
  footerText: {
    fontSize: 18,
  },
  iconButton: {
    padding: 5,
  },
});
