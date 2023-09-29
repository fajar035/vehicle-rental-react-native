/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

const Button = ({title, navigation, link}) => {
  return (
    <TouchableOpacity
      style={{
        width: '90%',
        height: 51,
        backgroundColor: '#FFCD61',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
      }}
      onPress={link}>
      <Text
        style={{
          color: '#393939',
          fontFamily: 'Nunito-Regular',
          fontWeight: '900',
          fontSize: 18,
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
