/* eslint-disable react-native/no-inline-styles */
import {Text, View, Modal, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';

function ModalComponent({title, onModal, navigation, type, cb}) {
  const [modal, setModal] = useState(false);
  console.log('MODAL FOR', type);

  return (
    <Modal
      visible={onModal}
      // transparent={true}
      animationType="slide"
      onRequestClose={() => {
        setModal(false);
      }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            backgroundColor: 'white',
            width: '90%',
            height: '30%',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            // borderWidth: 1,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.29,
            shadowRadius: 4.65,

            elevation: 7,
            padding: 10,
          }}>
          <Text
            style={{
              color: 'black',
              fontSize: 30,
              fontFamily: 'Poppins-Regular',
              fontWeight: '700',
              textAlign: 'center',
            }}>
            {title}
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: '#FFCD61',
              marginTop: 40,
              height: '20%',
              width: '50%',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
            }}
            onPress={() => {
              if (type === 'register fail') {
                setModal(!modal);
                cb(false);
              }
              if (type === 'register success') {
                setModal(!modal);
                navigation.navigate('Login');
              }
              if (type === 'login success') {
                setModal(!modal);
                navigation.replace('TabStack');
              }
              if (type === 'logout success') {
                cb(false);
                setModal(!modal);
                navigation.navigate('TabStack');
              }
              if (type === 'data null') {
                cb(false);
              }
              if (type === 'add success') {
                cb(false);
                navigation.replace('HomeScreen');
              }
              if (type === 'update profile') {
                cb(false);
                navigation.navigate('ProfileScreen');
              }
            }}>
            <Text
              style={{
                fontSize: 20,
                fontFamily: 'Poppins-Regular',
                color: 'black',
                fontWeight: '400',
              }}>
              OK
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

export default ModalComponent;
