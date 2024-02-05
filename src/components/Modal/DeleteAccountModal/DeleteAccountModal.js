import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../../redux/slices/SessionUser'; 
import colors from '../../../constants/colors';
import { FONT_SIZE_SM, FONT_SIZE_XS, FONT_SIZE_XXS, POPPINS_MEDIUM, POPPINS_SEMIBOLD, SCREEN_WIDTH } from '../../../constants/constants';
import { scale } from 'react-native-size-matters';

const DeleteAccountModal = ({ visible, onClose }) => {
  const dispatch = useDispatch();

  const handleDeleteAccount = () => {
    dispatch(logoutUser()); // Dispatch action to delete the account
    onClose(); // Close the modal after deleting the account
  };

  return (
    <Modal visible={visible} transparent>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>Are you sure you want to delete your account?</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onClose} style={styles.button}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDeleteAccount} style={[styles.button, styles.deleteButton]}>
              <Text style={[styles.buttonText, styles.deleteButtonText]}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: colors.white,
    padding: scale(30),
    borderRadius: scale(8),
    width: SCREEN_WIDTH * 0.9,
    alignItems: 'center',
  },
  modalText: {
    marginBottom: 20,
    textAlign: 'center',
    fontSize:FONT_SIZE_SM,
    fontFamily:POPPINS_MEDIUM,
    fontWeight:'700',
    color:colors.darkText,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: SCREEN_WIDTH * 0.6,
  },
  button: {
    paddingVertical: scale(10),
    paddingHorizontal: scale(20),
    borderRadius: scale(10),
    backgroundColor: 'lightgray',
  },
  buttonText: {
    color: colors.black,
    fontWeight: '800',
    fontSize:FONT_SIZE_XS,
    fontFamily:POPPINS_SEMIBOLD,
  },
  deleteButton: {
    backgroundColor: colors.error,
  },
  deleteButtonText: {
    color: colors.white,
  },
});

export default DeleteAccountModal;
