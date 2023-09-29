import {View, Text, Image} from 'react-native';
import React from 'react';
import {ActivityIndicator} from 'react-native-paper';
import logo from '../assets/Images/logo.png';

const SplashScreen = () => {
  return (
    <View
      style={{
        height: '100%',
        backgroundColor: '#FFFF',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image source={logo} style={{width: 75, height: 75}} />
      <Text
        style={{
          fontSize: 20,
          fontWeight: '600',
          marginTop: 10,
          marginBottom: 10,
        }}>
        Vehicle Rental
      </Text>
      <ActivityIndicator size="small" color="#FFCD61" />
    </View>
  );
};

export default SplashScreen;
