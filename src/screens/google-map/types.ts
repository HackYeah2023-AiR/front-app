/* eslint-disable prettier/prettier */
import { ImageSourcePropType } from 'react-native';

export interface MarkerItemProps {
  index: number;
  imageSource: ImageSourcePropType;
  latitude: number;
  longitude: number;
  handleMarkerPress: (index: number) => void;
}

export interface UserLocation {
  latitude: number;
  longitude: number;
}

export interface UserInitialRegion extends UserLocation {
  latitudeDelta: number;
  longitudeDelta: number;
}

export interface ItemProps {
  id: number;
  imageSource: ImageSourcePropType;
  animalName: string;
  date: string;
  latitude: number;
  longitude: number;
}

export interface ModalItemProps {
  openModal: boolean;
  item: ItemProps;
  handleCloseModal: () => void;
}
