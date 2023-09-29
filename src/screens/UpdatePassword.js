/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import {updatePassword} from '../utils/users';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Modal from '../components/Modal';

const UpdatePassword = ({navigation}) => {
  const token = useSelector(state => state.auth.authUser.token);
  const [showPassword, setShowPassword] = useState([false, false, false]);
  const [currentPassword, setCurrentPassword] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [repeatPassword, setRepeatPassword] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const changeShowPassword = idx => {
    let items = [...showPassword];
    let item = showPassword[idx];
    item = !showPassword[idx];
    items[idx] = item;
    setShowPassword(items);
  };

  const updatePassoword = useCallback(() => {
    console.log('CURRENT PASSWORD', currentPassword);
    console.log('NEW PASSWORD', newPassword);
    console.log('REPEAT PASSWORD', repeatPassword);
    if (
      currentPassword === null ||
      newPassword === null ||
      repeatPassword === null
    ) {
      alert('GAK BOLEH KOSONG');
    } else if (newPassword !== repeatPassword) {
      alert('harus beda');
    } else {
      alert('UPDATE');
    }
    const body = {};
    // console.log('UPDATE PASSWORD');
    // updatePassword(token, body)
    //   .then(res => {
    //     console.lg(res);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  }, [currentPassword, newPassword, repeatPassword]);

  useEffect(() => {
    updatePassoword;
  }, [updatePassoword]);

  return (
    <>
      <View
        onStartShouldSetResponder={() => {
          navigation.goBack();
        }}>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            // borderWidth: 1,
            width: '70%',
            padding: 20,
            marginTop: 20,
            // marginBottom: 20,
          }}>
          <Icon name="chevron-left" size={28} style={{color: '#393939'}} />
          <Text
            style={{
              color: '#393939',
              fontSize: 28,
              fontFamily: 'Nunito-Regular',
              fontWeight: 'bold',
            }}>
            Update Password
          </Text>
        </View>
      </View>

      <View>
        <View
          style={{
            padding: 25,
          }}>
          <Text
            style={{
              marginBottom: 10,
              fontFamily: 'Poppins-Regular',
              fontWeight: '700',
              fontSize: 14,
            }}>
            Current Password :
          </Text>
          <View
            style={{
              borderWidth: 1,
              borderRadius: 10,
              borderColor: 'grey',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <TextInput
              style={{
                // borderWidth: 1,
                width: '90%',
                padding: 10,
                fontFamily: 'Poppins-Regular',
              }}
              placeholder="Enter Your Current Password"
              onChangeText={text => {
                setCurrentPassword(text);
              }}
              secureTextEntry={!showPassword[0]}
            />
            <TouchableOpacity
              style={{
                // borderWidth: 1,
                padding: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {
                changeShowPassword(0);
              }}>
              <Icon
                name={showPassword[0] === true ? 'eye-slash' : 'eye'}
                size={20}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View>
        <View
          style={{
            padding: 25,
          }}>
          <Text
            style={{
              marginBottom: 10,
              fontFamily: 'Poppins-Regular',
              fontWeight: '700',
              fontSize: 14,
            }}>
            New Password :
          </Text>
          <View
            style={{
              borderWidth: 1,
              borderRadius: 10,
              borderColor: 'grey',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <TextInput
              style={{
                // borderWidth: 1,
                width: '90%',
                padding: 10,
                fontFamily: 'Poppins-Regular',
              }}
              placeholder="Enter Your New Password"
              onChangeText={text => {
                setNewPassword(text);
              }}
              secureTextEntry={!showPassword[1]}
            />
            <TouchableOpacity
              style={{
                // borderWidth: 1,
                padding: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {
                changeShowPassword(1);
              }}>
              <Icon
                name={showPassword[1] === true ? 'eye-slash' : 'eye'}
                size={20}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View>
        <View
          style={{
            padding: 25,
          }}>
          <Text
            style={{
              marginBottom: 10,
              fontFamily: 'Poppins-Regular',
              fontWeight: '700',
              fontSize: 14,
            }}>
            Repeat Password :
          </Text>
          <View
            style={{
              borderWidth: 1,
              borderRadius: 10,
              borderColor: 'grey',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <TextInput
              style={{
                // borderWidth: 1,
                width: '90%',
                padding: 10,
                fontFamily: 'Poppins-Regular',
              }}
              placeholder="Enter Your New Password"
              onChangeText={text => {
                setRepeatPassword(text);
              }}
              secureTextEntry={!showPassword[2]}
            />
            <TouchableOpacity
              style={{
                // borderWidth: 1,
                padding: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {
                changeShowPassword(2);
              }}>
              <Icon
                name={showPassword[2] === true ? 'eye-slash' : 'eye'}
                size={20}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View
        style={{
          padding: 25,
          flex: 1,
          // backgroundColor: 'red',
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          style={{
            padding: 20,
            backgroundColor: '#FFCD61',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
          }}
          onPress={updatePassoword}>
          <Text
            style={{
              fontFamily: 'Poppins-Regular',
              fontSize: 20,
              fontWeight: '700',
            }}>
            Update Password
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default UpdatePassword;
