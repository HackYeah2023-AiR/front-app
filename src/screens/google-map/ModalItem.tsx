/* eslint-disable prettier/prettier */
/* eslint-disable no-nested-ternary */
/* eslint-disable prettier/prettier */
import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  Modal,
  Text,
  TouchableOpacity,
} from 'react-native';
import { ModalItemProps } from './types';
import colors from '../../constants/colors';

export const ModalItem = ({
  openModal,
  item,
  handleCloseModal,
}: ModalItemProps) => {
  return (
    <Modal
      animationType="slide"
      transparent
      visible={openModal}
      onRequestClose={handleCloseModal}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Image source={item.imageSource} style={styles.modalImage} />
          <Text style={styles.modalTitle}>{item.animalName}</Text>
          <Text style={styles.modalText}>{item.date}</Text>
          <TouchableOpacity
            onPress={handleCloseModal}
            style={styles.closeButton}
          >
            <Text style={styles.textStyle}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: colors.gray,
  },
  closeButton: {
    width: 120,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 30,
    borderWidth: 3,
    borderColor: colors.orange,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    textAlign: 'center',
    color: colors.orange,
    fontSize: 24,
    fontWeight: '800',
  },
});
