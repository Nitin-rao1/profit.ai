// DeleteConfirmationModal.js
import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, Modal, StyleSheet} from 'react-native';
import Icons from '../../Icons/Icons';
import Button from '../../Button';
import colors from '../../../constants/colors';
import {scale} from 'react-native-size-matters';
import {
  POPPINS_SEMIBOLD,
  STANDARD_BORDER_RADIUS,
} from '../../../constants/constants';

const DeleteModal = ({isVisible, onClose, onConfirm, itemId}) => {
  console.log('modalcontenteditemId', itemId);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.modalclosebtn} onPress={onClose}>
            <Icons
              name={'close'}
              iconType={'AntDesign'}
              color={colors.error}
              size={20}
            />
          </TouchableOpacity>
          <Text style={styles.modalText}>
            Are you sure you want to remove the item
            <Text> from the List??</Text>
          </Text>
          <View style={styles.modalButtons}>
            <Button
              label={'Cancel'}
              labelStyle={styles.labelStyle}
              labelColor={colors.white}
              style={styles.modalButtonsty}
              backgroundColor={colors.dividerColor}
              onPress={onClose}
            />
            <Button
              label={'Yes, Remove'}
              labelStyle={styles.labelStyle}
              labelColor={colors.white}
              style={styles.modalButtonsty}
              backgroundColor={colors.primary}
              onPress={() => onConfirm(itemId)}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: colors.white,
    opacity: 0.9,
    borderWidth: 1,
    borderColor: '#B6B6B6',
    padding: scale(50),
    marginHorizontal: scale(10),
    marginVertical: scale(80),
    borderRadius: STANDARD_BORDER_RADIUS * 2,
  },
  modalText: {
    fontSize: scale(12),
    fontFamily: POPPINS_SEMIBOLD,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: scale(20),
    color: colors.black,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    alignSelf: 'center',
  },
  modalButtonsty: {
    width: '45%',
    height: scale(35),
    borderRadius: STANDARD_BORDER_RADIUS * 1.5,
  },
  modalclosebtn: {
    alignSelf: 'flex-end',
    position: 'absolute',
    padding: scale(15),
  },
  labelStyle: {
    fontSize: scale(10),
  },
});

export default DeleteModal;
