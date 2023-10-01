import React, { useCallback } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageSourcePropType,
  FlatList,
} from 'react-native';
import {
  MaterialCommunityIcons,
  FontAwesome5,
  FontAwesome,
} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import colors from '../../constants/colors';
import { PetItem } from './types';

const data: PetItem[] = [
  {
    id: 1,
    imageSource: require('../../../assets/small_dog.png'),
  },
  {
    id: 2,
    imageSource: require('../../../assets/fox.png'),
  },
];

export const LostPets = ({ navigation }) => {
  const handleButtonCLick = useCallback(() => {
    navigation.navigate('Form');
  }, [navigation]);

  return (
    <View style={styles.container}>
      {data ? (
        <View style={styles.list}>
          <Text style={styles.text}>Lost pets</Text>
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <PetItemComponent image={item.imageSource} />
            )}
            style={{ flexGrow: 0 }}
          />
        </View>
      ) : (
        <>
          <Text style={styles.text}>Lost your pet?</Text>
          <Image
            style={styles.image}
            source={require('../../../assets/wantedPet.png')}
          />
        </>
      )}
      <TouchableOpacity style={styles.button} onPress={handleButtonCLick}>
        <Text style={styles.buttonText}>Find</Text>
      </TouchableOpacity>
    </View>
  );
};

const PetItemComponent = ({ image }: { image: ImageSourcePropType }) => {
  const navigation = useNavigation();
  const handleSearchClick = useCallback(() => {
    navigation.navigate('PetSwiper');
  }, [navigation]);

  return (
    <View style={itemStyles.item}>
      <Image source={image} style={itemStyles.image} />
      <View style={itemStyles.buttons}>
        <TouchableOpacity style={itemStyles.button}>
          <FontAwesome name="check" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={itemStyles.button} onPress={handleSearchClick}>
          <FontAwesome5 name="search" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={itemStyles.button}>
          <MaterialCommunityIcons name="delete" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 40,
  },
  text: {
    textAlign: 'center',
    color: colors.orange,
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 20,
  },
  image: {
    width: 184,
    height: 184,
    marginBottom: 20,
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
  list: {
    paddingTop: 20,
  },
});

const itemStyles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 30,
  },
  buttons: {
    flexDirection: 'row',
  },
  button: {
    margin: 5,
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 30,
  },
});
