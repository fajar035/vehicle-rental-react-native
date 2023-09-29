/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/AntDesign';
import step3 from '../assets/Images/step3.png';
import {createHistoryApi} from '../utils/history';
import {getCategoryApi, getLocationApi} from '../utils/vehicles';
import {notification} from '../utils/notifications';

// import { useState } from 'react';

const FinishPayment = ({navigation, route}) => {
  const {dataPayment, dataApi, vehicle, day} = route.params;
  const [body, setBody] = useState(dataApi);
  const [category, setCategory] = useState([]);
  const [location, setLocation] = useState([]);
  const [categoryForBody, setCategoryForBody] = useState('');
  const [locationForBody, setLocationForBody] = useState('');
  console.log('DATA BODY', body);

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

  const paymentCode = Math.ceil(Math.random() * 100000000);
  const bookingCode = Math.random()
    .toString(36)
    .replace(/[^a-zA-Z0-9]+/g, '')
    .slice(0, 8)
    .toUpperCase();

  useEffect(() => {
    getCategoryApi()
      .then(res => {
        setCategory(res.data.result);
      })
      .catch(err => {
        console.log(err);
        Alert.alert('server error occurred');
      });

    getLocationApi()
      .then(res => {
        setLocation(res.data.result);
      })
      .catch(err => {
        console.log(err);
        Alert.alert('server error occurred');
      });

    // createHistoryApi(body)
    //   .then(res => {
    //     console.log(res);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  }, []);

  useEffect(() => {
    const checkCategory = () => {
      category.map(item => {
        let tmp = [];
        // console.log(item);
        // console.log(Object.values(item));
        if (Object.values(item)[1] === vehicle.category) {
          tmp.push(Object.values(item));
          setCategoryForBody(tmp[0][0]);
          // console.log('CATEGORY', tmp[0][0]);
          // setBody({
          //   ...body,
          //   id_category: category[0][0],
          // });
        }
        return tmp;
      });
    };

    const checkLocation = () => {
      location.map(item => {
        let tmp = [];
        if (Object.values(item)[1] === vehicle.location) {
          tmp.push(Object.values(item));
          setLocationForBody(tmp[0][0]);
          // console.log('LOCATION', location[0][0]);
          // setBody({
          //   ...body,
          //   id_location: location[0][0],
          // });
        }
        return tmp;
      });
    };
    checkCategory();
    checkLocation();
    // console.log(locationForBody > 0);
  }, [category, location, vehicle.category, vehicle.location]);

  useEffect(() => {
    if (locationForBody > 0) {
      setBody({
        ...body,
        id_location: locationForBody,
      });
    }
  }, [locationForBody]);
  useEffect(() => {
    if (categoryForBody > 0) {
      setBody({
        ...body,
        id_category: categoryForBody,
      });
    }
  }, [categoryForBody]);

  // console.log('CATEGORY', categoryForBody);
  // console.log('LOCATION', locationForBody);
  // console.log('VEHICLE', vehicle);

  const cobaNotifikasi = () => {
    notification.createChannel('payment');
    notification.sendNoification(
      'payment',
      'Successful Payment',
      'Please wait for your vehicle, you will deliver your ordered vehicle, thank you ^_^',
    );
  };

  const payment = () => {
    createHistoryApi(body)
      .then(res => {
        cobaNotifikasi();
        console.log(res.data.result);
        navigation.replace('HistoryDetailScreen', {
          vehicle: vehicle,
          day: day,
          dataApi: dataApi,
          dataPayment: dataPayment,
          price: numberToRupiah(vehicle.price * day),
          idTransaction: res.data.result.id,
        });
      })
      .catch(err => {
        console.log(err);
      });
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
        <Image source={step3} style={{height: 60, width: 200}} />
      </View>

      {/* CONTENT */}

      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            // borderWidth: 1,
            width: '90%',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontFamily: 'Nunito-Reglar',
              fontWeight: '700',
              fontSize: 18,
              color: '#393939',
              marginBottom: 5,
            }}>
            Payment Code :
          </Text>
          <Text
            style={{
              fontFamily: 'Nunito-Reglar',
              fontWeight: '700',
              fontSize: 36,
              color: '#393939',
              marginBottom: 5,
            }}>
            {paymentCode}
          </Text>
          <Text
            style={{
              fontFamily: 'Nunito-Reglar',
              fontWeight: '400',
              fontSize: 13,
              color: '#393939',
              textAlign: 'center',
              marginBottom: 10,
            }}>
            Insert your payment code while you transfer booking order Pay before
            :{' '}
          </Text>

          <Text
            style={{
              fontFamily: 'Nunito-Reglar',
              fontWeight: '700',
              fontSize: 24,
              color: '#9B0A0A',
              textAlign: 'center',
              marginBottom: 10,
            }}>
            1:59:34
          </Text>

          <Text
            style={{
              fontFamily: 'Nunito-Reglar',
              fontWeight: '700',
              fontSize: 16,
              color: '#616167',
              textAlign: 'center',
              marginBottom: 10,
            }}>
            Bank account information :
          </Text>

          <Text
            style={{
              fontFamily: 'Nunito-Reglar',
              fontWeight: '700',
              fontSize: 24,
              color: '#616167',
              textAlign: 'center',
              marginBottom: 10,
            }}>
            0290-90203-345-2
          </Text>

          <Text
            style={{
              fontFamily: 'Nunito-Reglar',
              fontWeight: '700',
              fontSize: 16,
              color: '#616167',
              textAlign: 'center',
              marginBottom: 10,
            }}>
            {`${vehicle.name} Rental ${vehicle.location}`}
          </Text>
        </View>
      </View>

      {/* Line */}
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

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 5,
        }}>
        <Text
          style={{
            color: '#616167',
            fontFamily: 'Nunito-Regular',
            fontWeight: '400',
            fontSize: 16,
          }}>
          Booking Code:{' '}
        </Text>

        <Text
          style={{
            color: 'green',
            fontFamily: 'Nunito-Regular',
            fontWeight: '700',
            fontSize: 16,
          }}>
          {bookingCode}
        </Text>
      </View>

      <Text
        style={{
          color: 'green',
          fontFamily: 'Nunito-Regular',
          fontWeight: '700',
          fontSize: 16,
          textAlign: 'center',
          marginBottom: 10,
        }}>
        {`Use booking code to pick up your ${vehicle.name}`}
      </Text>

      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 10,
          marginBottom: 10,
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: '#FFCD61',
            width: '60%',
            height: 50,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontFamily: 'Nunito-Regular',
              fontSize: 12,
              fontWeight: '800',
              color: '#393939',
            }}>
            Copy Payment & Booking Code
          </Text>
        </TouchableOpacity>
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
          Order details :
        </Text>

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
          {`Rp. ${numberToRupiah(vehicle.price * day)}`}
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

      {/* Button */}
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
          style={{
            width: '90%',
            height: 70,
            backgroundColor: '#FFCD61',
            marginTop: 40,
            marginBottom: 20,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
          }}
          onPress={payment}>
          <Text
            style={{
              fontFamily: 'Nunito-Regular',
              fontSize: 24,
              fontWeight: '800',
              color: '#393939',
            }}>
            Finish Payment
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default FinishPayment;
