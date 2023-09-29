/* eslint-disable react-native/no-inline-styles */
import {View, Text, ScrollView, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/AntDesign';
import step2 from '../assets/Images/step2.png';
import {API_URL} from '@env';
// import { useState } from 'react';

const Reservation = ({navigation, route}) => {
  const {dataPayment, dataApi, vehicle, day} = route.params;
  const photo = JSON.parse(vehicle.photo);
  console.log(route.params);

  const numberToRupiah = bilangan => {
    let separator = '';
    let number_string = bilangan;
    if (typeof bilangan === 'number') {
      number_string = bilangan.toString();
    }
    let sisa = number_string.length % 3,
      rupiah = number_string.substr(0, sisa),
      ribuan = number_string.substr(sisa).match(/\d{3}/g);

    if (ribuan) {
      separator = sisa ? '.' : '';
      rupiah += separator + ribuan.join('.');
    }
    return rupiah;
  };
  return (
    <ScrollView>
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
          // borderWidth: 1,
          width: '45%',
          padding: 20,
          marginTop: 20,
          marginBottom: 20,
        }}
        onStartShouldSetResponder={() => {
          navigation.goBack();
        }}>
        <Icon
          name="chevron-left"
          size={28}
          style={{paddingEnd: 30, color: '#393939'}}
        />
        <Text
          style={{
            color: '#393939',
            fontSize: 28,
            fontFamily: 'Nunito-Regular',
            fontWeight: 'bold',
          }}>
          Payment
        </Text>
      </View>

      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          // borderWidth: 1,
          margin: 30,
          marginTop: 5,
          marginBottom: 40,
          // height: 70,
        }}>
        <Image source={step2} style={{height: 60, width: 200}} />
      </View>

      {/* CONTENT */}
      <View
        style={{
          position: 'relative',
          padding: 10,
          // borderWidth: 1,
        }}>
        <View
          style={{
            width: '100%',
            height: 250,
            borderRadius: 10,
            marginRight: 20,
            overflow: 'hidden',
            borderWidth: 1,
            borderColor: '#393939',
          }}>
          <Image
            source={{uri: API_URL + photo[0]}}
            style={{
              width: undefined,
              height: undefined,
              resizeMode: 'cover',
              flex: 1,
            }}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            width: 70,
            height: 37,
            // borderWidth: 1,
            backgroundColor: '#F8A170',
            padding: 5,
            borderRadius: 40,
            position: 'absolute',
            bottom: 40,
            right: 40,
          }}>
          <Text
            style={{
              fontFamily: 'Nunito-Regular',
              fontSize: 12,
              fontWeight: '800',
              color: 'white',
            }}>
            4.5
          </Text>
          <Icon name="star" size={14} style={{color: '#fff'}} />
        </View>
      </View>

      <View
        style={{
          padding: 20,
          // borderWidth: 1,
        }}>
        <Text
          style={{
            fontFamily: 'Nunito-Regular',
            fontWeight: '400',
            fontSize: 16,
            color: '#616167',
            marginBottom: 10,
          }}>
          {parseInt(dataApi.qty, 10) > 1
            ? `${dataApi.qty} Vehicles ${vehicle.name}`
            : `${dataApi.qty} Vehicle ${vehicle.name}`}
        </Text>

        <Text
          style={{
            fontFamily: 'Nunito-Regular',
            fontWeight: '400',
            fontSize: 16,
            color: '#616167',
            marginBottom: 10,
          }}>
          {dataPayment.paymentType.length === 0 ? '-' : dataPayment.paymentType}
        </Text>

        <Text
          style={{
            fontFamily: 'Nunito-Regular',
            fontWeight: '400',
            fontSize: 16,
            color: '#616167',
            marginBottom: 10,
          }}>
          {`${day} ${day > 1 ? 'Days' : 'Day'}`}
        </Text>

        <Text
          style={{
            fontFamily: 'Nunito-Regular',
            fontWeight: '400',
            fontSize: 16,
            color: '#616167',
            marginBottom: 10,
          }}>
          {`${dataApi.start_date} to ${dataApi.return_date}`}
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          // borderWidth: 1,
          paddingStart: 20,
          paddingEnd: 20,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            fontFamily: 'Nunito-Regular',
            fontSize: 36,
            fontWeight: '700',
            color: 'black',
          }}>
          {`Rp. ${numberToRupiah(
            vehicle.price * day * parseInt(dataApi.qty, 10),
          )}`}
        </Text>
        <Icon2
          name="infocirlce"
          style={{
            fontFamily: 'Nunito-Regular',
            fontSize: 36,
            fontWeight: '700',
            color: '#DFDEDE',
          }}
        />
      </View>

      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 20,
          marginBottom: 20,
        }}>
        <View
          style={{
            borderBottomWidth: 2,
            borderBottomColor: '#DFDEDE',
            width: '90%',
            // height: 5,
            flex: 1,
          }}
        />
      </View>

      {/* Button */}
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
          style={{
            width: '90%',
            height: 70,
            backgroundColor: '#FFCD61',
            // marginTop: 40,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
          }}
          onPress={() => {
            navigation.navigate('FinishPaymentScreen', {
              dataPayment: dataPayment,
              dataApi: dataApi,
              vehicle: vehicle,
              day: day,
            });
          }}>
          <Text
            style={{
              fontFamily: 'Nunito-Regular',
              fontSize: 24,
              fontWeight: '800',
              color: '#393939',
            }}>
            Get Payment Code
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Reservation;
