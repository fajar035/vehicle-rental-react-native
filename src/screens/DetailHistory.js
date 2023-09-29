/* eslint-disable react-native/no-inline-styles */
import {View, Text, ScrollView, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import React from 'react';
import {API_URL} from '@env';
// import imgDefault from '../assets/Images/noImageVehicle.jpeg';

const DetailHistory = ({navigation, route}) => {
  console.log('ROUTE', route.params);
  const {dataApi, vehicle, dataPayment, day, price, idTransaction} =
    route.params;
  const {photo} = vehicle;

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
          marginBottom: 30,
        }}
        onStartShouldSetResponder={() => {
          navigation.navigate('History');
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
          See History
        </Text>
      </View>

      <Text
        style={{
          color: '#087E0D',
          fontFamily: 'Nunito-Regular',
          fontSize: 24,
          fontWeight: '700',
          textAlign: 'center',
          marginBottom: 20,
        }}>
        Payment Success!
      </Text>

      <View
        style={{
          justifyContent: 'center',
          marginTop: 20,
          marginBottom: 20,
          alignItems: 'center',
          position: 'relative',
        }}>
        <View
          style={{
            width: '90%',
            height: 250,
            borderRadius: 10,
            overflow: 'hidden',
            borderWidth: 1,
            borderColor: '#393939',
          }}>
          <Image
            source={{uri: API_URL + JSON.parse(photo)[0]}}
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
            bottom: 20,
            right: 35,
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
          // borderWidth: 1,
          paddingStart: 20,
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
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 10,
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

      <View
        style={{
          paddingStart: 20,
        }}>
        <Text
          style={{
            fontFamily: 'Nunito-Regular',
            fontWeight: '400',
            fontSize: 16,
            color: '#616167',
            marginBottom: 10,
          }}>
          ID : {idTransaction}
        </Text>
        <Text
          style={{
            fontFamily: 'Nunito-Regular',
            fontWeight: '400',
            fontSize: 16,
            color: '#616167',
            marginBottom: 10,
          }}>
          {dataPayment.name} ({dataPayment.email})
        </Text>
        <View
          style={{
            // borderWidth: 1,
            flexDirection: 'row',
          }}>
          <Text
            style={{
              fontFamily: 'Nunito-Regular',
              fontWeight: '400',
              fontSize: 16,
              color: '#616167',
              marginBottom: 10,
            }}>
            {`${dataPayment.phone} `}
          </Text>
          <Text
            style={{
              color: '#616167',
              fontFamily: 'Nunito-Regular',
              fontWeight: '700',
              fontSize: 16,
            }}>
            {'( '}
          </Text>
          <Text
            style={{
              color: '#087E0D',
              fontFamily: 'Nunito-Regular',
              fontWeight: '700',
              fontSize: 16,
            }}>
            active
          </Text>
          <Text
            style={{
              color: '#616167',
              fontFamily: 'Nunito-Regular',
              fontWeight: '700',
              fontSize: 16,
            }}>
            {' )'}
          </Text>
        </View>
        <Text
          style={{
            fontFamily: 'Nunito-Regular',
            fontWeight: '400',
            fontSize: 16,
            color: '#616167',
            marginBottom: 10,
          }}>
          {vehicle.location}, Indonesia
        </Text>
      </View>

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
            navigation.replace('TabStack');
          }}>
          <Text
            style={{
              fontFamily: 'Nunito-Regular',
              fontSize: 24,
              fontWeight: '800',
              color: '#393939',
            }}>
            {`Total : ${price}`}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default DetailHistory;
