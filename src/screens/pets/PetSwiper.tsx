import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import Swiper from 'react-native-swiper';

const data = [
  {
    image: require('../../../assets/dog_full.jpg'),
    address: '123 Main St, Springfield, IL',
    date: '23/07/2023',
    latitude: 39.7817,
    longitude: -89.6501,
  },
  {
    image: require('../../../assets/dog_full2.jpg'),
    address: '456 Elm St, Rivertown, TX',
    date: '25/07/2023',
    latitude: 31.9686,
    longitude: -99.9018,
  },
];

export const PetSwiper = () => {
  const openMaps = (latitude: number, longitude: number) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    Linking.openURL(url);
  };

  return (
    <Swiper
      style={styles.wrapper}
      showsPagination={false}
      loop={false}
      horizontal={false}
    >
      {data.map((item, index) => (
        <View style={styles.slide} key={index}>
          <Image source={item.image} style={styles.image} resizeMode="cover" />
          <View style={styles.footer}>
            <View style={styles.textBox}>
              <Text style={styles.text}>{item.address}</Text>
              <Text style={styles.text}>{item.date}</Text>
            </View>
            <TouchableOpacity
              style={styles.googleMap}
              onPress={() => openMaps(item.latitude, item.longitude)}
            >
              <Image source={require('../../../assets/google_maps.png')} />
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </Swiper>
  );
};

const styles = StyleSheet.create({
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  textBox: {
    color: '#fff',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 10,
    marginRight: 40,
  },
  text: {
    color: '#fff',
    fontSize: 18,
  },
  footer: {
    position: 'absolute',
    bottom: 50,
    left: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    width: '100%',
    paddingHorizontal: 10,
  },
  googleMap: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 30,
  },
});
