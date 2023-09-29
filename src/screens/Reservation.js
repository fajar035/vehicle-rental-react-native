/* eslint-disable no-shadow */
/* eslint-disable no-extend-native */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';
import step1 from '../assets/Images/step1.png';
import {Picker} from '@react-native-picker/picker';
import jwt_decode from 'jwt-decode';
import {getUserByIdApi} from '../utils/users';

const Reservation = ({navigation, route}) => {
  const [data, setData] = useState({
    idCard: '',
    name: '',
    phone: '',
    email: '',
    paymentType: '',
  });
  const [user, setUser] = useState({});
  const [userForInput, setUserForInput] = useState({});
  const [notLogin, setNotLogin] = useState(false);
  const vehicles = route.params.vehicles;
  const day = route.params.day;
  const qty = route.params.qty;
  let date = route.params.selectDate;

  const token = useSelector(state => state.auth.authUser.token);
  let dateArr = date.split('-');
  Array.prototype.move = function (from, to) {
    this.splice(to, 0, this.splice(from, 1)[0]);
    return this;
  };

  dateArr.move(2, 0);
  dateArr.move(1, 2);
  const newDate = dateArr.join('-');

  let someDate = new Date(newDate);
  someDate.setDate(someDate.getDate() + parseInt(day, 10));

  const dateLocal = iso8601 => {
    const date = new Date(iso8601).toString();
    const newDate = new Date(date);
    const day = ('0' + newDate.getDate()).slice(-2);
    const mnth = ('0' + (newDate.getMonth() + 1)).slice(-2);
    const year = newDate.getFullYear();
    return [day, mnth, year].join('-');
  };
  const returnDate = dateLocal(someDate);

  const dataForApi = {
    id_users: user.id,
    id_vehicles: vehicles.id,
    id_category: '',
    id_location: '',
    qty: qty,
    start_date: date,
    return_date: returnDate,
  };

  useEffect(() => {
    const tokenDecoded = token === null ? setNotLogin(true) : token;
    if (token) {
      setUser(jwt_decode(tokenDecoded));
    }
  }, [token]);

  useEffect(() => {
    getUserByIdApi(token)
      .then(res => {
        setUserForInput(res.data.result);
      })
      .catch(err => {
        console.log(err);
      });
  }, [token]);

  console.log('USER>>>', userForInput);
  return (
    <ScrollView>
      {/* MODAL NOT LOGIN */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={notLogin}
        onRequestClose={() => {
          setNotLogin(!notLogin);
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff',
          }}>
          <View
            style={{
              margin: 20,
              backgroundColor: 'white',
              borderRadius: 20,
              padding: 35,
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}>
            <Text
              style={{
                marginBottom: 15,
                textAlign: 'center',
                color: 'black',
                fontSize: 25,
                fontFamily: 'Poppins-Regular',
                fontWeight: '700',
              }}>
              Kamu belum login, harap login untuk memesan kendaraan anda
            </Text>
            <Pressable
              style={{
                backgroundColor: '#FFCD61',
                borderRadius: 10,
                width: 100,
                padding: 15,
                elevation: 2,
              }}
              onPress={() => {
                setNotLogin(!notLogin);

                navigation.replace('AuthScreen');
              }}>
              <Text
                style={{
                  color: 'black',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  elevation: 2,
                }}>
                Ok
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>

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
          marginBottom: 70,
          // height: 70,
        }}>
        <Image source={step1} style={{height: 60, width: 200}} />
      </View>

      {/* Form Input */}
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 20,
        }}>
        <TextInput
          keyboardType="numeric"
          placeholder="ID Card Number"
          placeholderTextColor="#393939"
          onChangeText={text => {
            setData({
              ...data,
              idCard: text,
            });
          }}
          style={{
            // borderWidth: 1,
            width: '90%',
            // paddingStart: 20,
            backgroundColor: '#DFDEDE',
            color: '#000',
            borderRadius: 10,
            padding: 20,
          }}
        />
      </View>

      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 20,
        }}>
        <TextInput
          placeholder="Name"
          placeholderTextColor="#393939"
          value={
            Object.values(userForInput).length !== null
              ? userForInput.name
              : null
          }
          onChangeText={text => {
            setData({
              ...data,
              name: text,
            });
          }}
          style={{
            // borderWidth: 1,
            width: '90%',
            // paddingStart: 20,
            backgroundColor: '#DFDEDE',
            color: '#000',
            borderRadius: 10,
            padding: 20,
          }}
        />
      </View>

      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 20,
        }}>
        <TextInput
          keyboardType="phone-pad"
          placeholder="Mobile Phone (must be active)"
          placeholderTextColor="#393939"
          onChangeText={text => {
            setData({
              ...data,
              phone: text,
            });
          }}
          value={
            Object.values(userForInput).length !== null
              ? userForInput.phone
              : null
          }
          style={{
            // borderWidth: 1,
            width: '90%',
            // paddingStart: 20,
            backgroundColor: '#DFDEDE',
            color: '#000',
            borderRadius: 10,
            padding: 20,
          }}
        />
      </View>

      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 20,
        }}>
        <TextInput
          keyboardType="email-address"
          placeholder="Email address"
          placeholderTextColor="#393939"
          onChangeText={text => {
            setData({
              ...data,
              email: text,
            });
          }}
          value={
            Object.values(userForInput).length !== null
              ? userForInput.email
              : null
          }
          style={{
            // borderWidth: 1,
            width: '90%',
            // paddingStart: 20,
            backgroundColor: '#DFDEDE',
            color: '#000',
            borderRadius: 10,
            padding: 20,
          }}
        />
      </View>

      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <View
          style={{
            width: '90%',
            height: 70,
            marginBottom: 5,
            borderRadius: 10,
            backgroundColor: '#DFDEDE',
            opacity: 0.8,
            color: 'black',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Picker
            dropdownIconColor="#000"
            selectedValue={data.paymentType}
            style={{
              width: '100%',
              color: '#000',
            }}
            onValueChange={itemValue => {
              setData({
                ...data,
                paymentType: itemValue !== 0 ? itemValue : 10,
              });
            }}>
            <Picker.Item label="Payment type" value="0" />
            <Picker.Item
              label="Prepayment (no tax)"
              value="Prepayment (no tax)"
            />
            <Picker.Item
              label="Pay at the end (include tax)"
              value="Pay at the end (include tax)"
            />
            <Picker.Item
              label="Partial payment (include tax)"
              value="Partial payment (include tax)"
            />
          </Picker>
        </View>
      </View>

      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
          style={{
            width: '90%',
            height: 70,
            backgroundColor: '#FFCD61',
            marginTop: 40,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
          }}
          onPress={() => {
            navigation.navigate('OrderDetailScreen', {
              dataApi: dataForApi,
              vehicle: vehicles,
              dataPayment: data,
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
            See Order Detail
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Reservation;
