import React, { useCallback, useState, useEffect } from 'react';
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
import axios from 'axios';
import colors from '../../constants/colors';
import {
  GET_ALL_DISAPPEARED_ANIMALS,
  DELETE_DISAPPEARED_ANIMALS,
} from '../../api/api';

const data2: PetItem[] = [
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
  const [data, setData] = useState({});
  const [refetch, setRefetch] = useState(false);

  const handleButtonCLick = useCallback(() => {
    navigation.navigate('Form');
  }, [navigation]);

  useEffect(() => {
    axios.get(GET_ALL_DISAPPEARED_ANIMALS).then(res => {
      const data = res.data;

      const tData = data.map(item => {
        return {
          id: item.id,
          imageSource: { uri: item.images[0] },
        };
      });

      setData(tData);
    });
  }, [refetch]);

  const handleRefetch = () => setRefetch(state => !state);

  return (
    <View style={styles.container}>
      {data2 ? (
        <View style={styles.list}>
          <Text style={styles.text}>Lost pets</Text>
          <FlatList
            data={data2}
            renderItem={({ item }) => (
              <PetItemComponent
                id={item.id}
                image={item.imageSource}
                handleRefetch={handleRefetch}
              />
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

const PetItemComponent = ({
  id,
  image,
  handleRefetch,
}: {
  id: number;
  image: ImageSourcePropType;
  handleRefetch: () => void;
}) => {
  const navigation = useNavigation();
  const handleSearchClick = useCallback(() => {
    navigation.navigate('PetSwiper');
  }, [navigation]);

  const handleOkClick = useCallback(() => {}, []);

  const handleDeleteClick = useCallback(() => {
    axios.delete(DELETE_DISAPPEARED_ANIMALS + id).then(() => handleRefetch());
  }, [id, handleRefetch]);

  return (
    <View style={itemStyles.item}>
      <Image source={image} style={itemStyles.image} />
      <View style={itemStyles.buttons}>
        <TouchableOpacity style={itemStyles.button} onPress={handleOkClick}>
          <FontAwesome name="check" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={itemStyles.button} onPress={handleSearchClick}>
          <FontAwesome5 name="search" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={itemStyles.button} onPress={handleDeleteClick}>
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
