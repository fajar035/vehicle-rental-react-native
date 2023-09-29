/* eslint-disable react-native/no-inline-styles */
import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const NotLogin = ({navigation}) => {
  console.log(navigation);
  return (
    <View
      style={{
        // flex: 1,
        backgroundColor: '#ffF',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}>
      <Text
        style={{
          color: '#2e1f05',
          fontFamily: 'Nunito-Regular',
          fontSize: 50,
          fontWeight: '700',
          marginBottom: 40,
        }}>
        Kamu belum login
      </Text>
      <FontAwesome5 name="sad-tear" size={150} style={{color: '#2e1f05'}} />

      <TouchableOpacity
        style={{
          backgroundColor: '#FFCD61',
          borderRadius: 10,
          width: '90%',
          height: 70,
          marginTop: 300,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => {
          navigation.navigate('AuthScreen');
        }}>
        <Text
          style={{
            color: 'black',
            fontFamily: 'Poppins-Regular',
            fontWeight: '700',
            fontSize: 30,
          }}>
          Login
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default NotLogin;
