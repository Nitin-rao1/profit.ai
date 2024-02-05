import React from 'react';
import { View, Modal, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { FONT_SIZE_MD, FONT_SIZE_SM, FONT_SIZE_XS, POPPINS_MEDIUM, SCREEN_HEIGHT, SCREEN_WIDTH, STANDARD_BORDER_RADIUS, STANDARD_BORDER_WIDTH, STANDARD_VECTOR_ICON_SIZE } from '../../../constants/constants';
import Camera2 from '../../../assets/svg/Camera2.svg';
import Gallery from '../../../assets/svg/Gallery.svg';
import { Images } from '../../../constants/images';
import { scale } from 'react-native-size-matters';
import colors from '../../../constants/colors';

const ImagePickerModal = ({ isVisible, onClose, onCameraPress, onGalleryPress }) => {
    return (
        <Modal
            animationType="none"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <TouchableOpacity activeOpacity={1}
                onPress={onClose} style={styles.modalContainer}>
                <View style={styles.innerModal}>
                    <View style={styles.topline} />
                    <View style={styles.SvgWrapper}>
                        <TouchableOpacity onPress={onCameraPress} style={{ alignItems: 'center' }}>
                            <View style={styles.SvgContainer}>
                                <Camera2
                                    width={STANDARD_VECTOR_ICON_SIZE * 1.5}
                                    height={STANDARD_VECTOR_ICON_SIZE * 1.5}
                                />

                            </View>
                            <Text style={styles.titletxt}>Open Camera</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onGalleryPress} style={{ alignItems: 'center' }}>
                            <View style={styles.SvgContainer}>
                                <Gallery
                                    width={STANDARD_VECTOR_ICON_SIZE * 1.5}
                                    height={STANDARD_VECTOR_ICON_SIZE * 1.5}
                                />
                            </View>
                            <Text style={styles.titletxt}>Open Gallery</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
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
    topline: {
        backgroundColor: colors.gray,
        height: scale(6),
        width: SCREEN_WIDTH * 0.25,
        borderRadius: STANDARD_BORDER_RADIUS * 1,
        position: 'absolute',
        marginTop: scale(10),
        top: 0,
    },
    innerModal: {
        height: SCREEN_HEIGHT * 0.3,
        backgroundColor: 'white',
        padding: 20,
        borderTopLeftRadius: STANDARD_BORDER_RADIUS * 4,
        borderTopRightRadius: STANDARD_BORDER_RADIUS * 4,
        width: SCREEN_WIDTH,
        alignItems: 'center',
        justifyContent: 'center',
        bottom: 0,
        position: 'absolute',
    },
    SvgWrapper: {
        width: SCREEN_WIDTH,
        flexDirection: 'row',
        justifyContent: 'space-around',
        // backgroundColor:'red',
    },
    SvgContainer: {
        height: SCREEN_HEIGHT * 0.1,
        width: SCREEN_WIDTH * 0.2,
        borderWidth: STANDARD_BORDER_WIDTH * 1,
        borderColor: colors.black,
        borderRadius: STANDARD_BORDER_RADIUS * 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titletxt: {
        fontSize: FONT_SIZE_SM,
        fontFamily: POPPINS_MEDIUM,
        fontWeight: '700',
        color: colors.black,
        lineHeight: scale(25),
    },
    optionButton: {
        marginVertical: 10,
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#3498db',
        alignItems: 'center',
    },
    optionButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default ImagePickerModal;
