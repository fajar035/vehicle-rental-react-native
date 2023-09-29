/* eslint-disable react-native/no-inline-styles */
import {View, Text, ScrollView, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import noImageVehicle from '../assets/Images/noImageVehicle.jpeg';
import {numberToRupiah} from '../helpers';

const VehiclesPopular = ({navigation, popular}) => {
  return (
    <>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            width: '50%',
            padding: 20,
            marginTop: 20,
            marginBottom: 20,
          }}>
          <Icon
            name="chevron-left"
            size={22}
            style={{paddingEnd: 30, color: '#393939'}}
          />
          <Text
            style={{
              color: '#393939',
              fontSize: 18,
              fontFamily: 'Nunito-Regular',
              fontWeight: 'bold',
            }}>
            Popular Vehicles
          </Text>
        </View>
      </TouchableOpacity>
      <ScrollView>
        {popular.length > 0 &&
          popular.map((item, idx) => {
            const photo = JSON.parse(item.photo)[0];
            return (
              <TouchableOpacity
                style={{
                  // borderWidth: 1,
                  flexDirection: 'row',
                  marginTop: 30,
                  padding: 20,
                  alignItems: 'center',
                }}
                key={idx}
                onPress={() => {
                  navigation.navigate('DetailVehicleScreen', {
                    id: item.id_vehicle,
                  });
                }}>
                <View
                  style={{
                    height: 100,
                    width: 100,
                    borderRadius: 20,
                    // borderWidth: 1,
                    marginEnd: 30,
                    overflow: 'hidden',
                  }}>
                  <Image
                    onError={() => noImageVehicle}
                    source={{uri: photo}}
                    style={{
                      width: undefined,
                      height: undefined,
                      flex: 1,
                      resizeMode: 'cover',
                    }}
                  />
                </View>

                <View style={{flex: 1}}>
                  <Text
                    style={{
                      fontFamily: 'Nunito-Regular',
                      fontSize: 14,
                      fontWeight: 'bold',
                      color: 'black',
                    }}>
                    {item.vehicle}
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Nunito-Regular',
                      fontSize: 12,
                      fontWeight: 'normal',
                      color: 'black',
                    }}>
                    {`Max for ${item.capacity} person`}
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Nunito-Regular',
                      fontSize: 12,
                      fontWeight: 'normal',
                      color: 'black',
                    }}>
                    {item.location}
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Nunito-Regular',
                      fontSize: 13,
                      fontWeight: 'bold',
                      color: 'green',
                      marginBottom: 5,
                    }}>
                    {item.status}
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Nunito-Regular',
                      fontSize: 14,
                      fontWeight: 'bold',
                      color: 'black',
                    }}>
                    {`Rp. ${numberToRupiah(item.price)} /day`}
                  </Text>
                </View>
              </TouchableOpacity>
            );
            // console.log('PHOTO', API_URL + photo[0]);
          })}
      </ScrollView>
    </>
  );
};

export default VehiclesPopular;
