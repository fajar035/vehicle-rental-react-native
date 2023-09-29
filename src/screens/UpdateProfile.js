/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import defaultPhoto from '../assets/Images/defaultFotoUpload.png';
import {RadioButton} from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {API_URL} from '@env';
import {updateProfileApi} from '../utils/users';
import Modal from '../components/Modal';

const UpdateProfile = ({navigation, route}) => {
  const token = useSelector(state => state.auth.authUser.token);
  const [profile] = useState(route.params.profile);
  const [photo, setPhoto] = useState(null);
  const [checked, setChecked] = React.useState(profile.gender);
  const [isDateVisible, setIsDateVisible] = useState(false);
  const [editModeName, setEditModeName] = useState(false);
  const [editModeEmail, setEditModeEmail] = useState(false);
  const [editModePhone, setEditModePhone] = useState(false);
  const [editModeAddress, setEditModeAddress] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectDate, setSelectDate] = useState(profile.birtday);
  const [address, setAddress] = useState('');
  const [isSuccessUpdate, setIsSuccessUpdate] = useState(false);

  const handleConfirmDate = date => {
    const dateLocal = iso8601 => {
      const date = new Date(iso8601).toString();
      const newDate = new Date(date);
      const day = ('0' + newDate.getDate()).slice(-2);
      const mnth = ('0' + (newDate.getMonth() + 1)).slice(-2);
      const year = newDate.getFullYear();
      return [year, mnth, day].join('-');
    };
    setSelectDate(dateLocal(date));
    setIsDateVisible(false);
  };

  const handleChoosePhoto = () => {
    ImagePicker.launchImageLibrary({noData: true}, response => {
      // console.log(response);
      if (response.didCancel) {
        return;
      }
      if (response) {
        setPhoto(response.assets[0]);
      }
    });
  };

  const cbIsSuccessUpdate = text => {
    setIsSuccessUpdate(text);
  };

  const handleSave = () => {
    const body = new FormData();
    if (photo !== null) {
      body.append('photoUser', {
        uri: photo.uri,
        type: photo.type,
        name: photo.fileName,
      });
    }
    if (checked) {
      body.append('gender', checked);
    }
    if (name) {
      body.append('name', name);
    }
    if (email) {
      body.append('email', email);
    }
    if (phone) {
      body.append('nohp', phone);
    }
    if (selectDate) {
      body.append('dob', selectDate);
    }
    if (address) {
      body.append('address', address);
    }

    updateProfileApi(body, token)
      .then(res => {
        console.log(res);
        cbIsSuccessUpdate(true);
      })
      .catch(err => {
        console.log(err);
      })
      .done();
  };
  console.log('BODY', profile.birtday.length);
  return (
    <>
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
          // borderWidth: 1,
          width: '60%',
          padding: 20,
          marginTop: 20,
          // marginBottom: 20,
        }}
        onStartShouldSetResponder={() => {
          navigation.goBack();
        }}>
        <Icon name="chevron-left" size={28} style={{color: '#393939'}} />
        <Text
          style={{
            color: '#393939',
            fontSize: 28,
            fontFamily: 'Nunito-Regular',
            fontWeight: 'bold',
          }}>
          Update Profile
        </Text>
      </View>
      <ScrollView>
        <Modal
          title="Successfully changed your profile"
          onModal={isSuccessUpdate}
          type="update profile"
          navigation={navigation}
          cb={cbIsSuccessUpdate}
        />

        <View
          style={{
            // borderWidth: 1,
            marginTop: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: 150,
              height: 150,
              borderRadius: 150 / 2,
              position: 'relative',
            }}>
            <Image
              source={
                photo !== null
                  ? {uri: photo.uri}
                  : profile.photo === null
                  ? defaultPhoto
                  : {uri: API_URL + profile.photo}
              }
              style={{
                flex: 1,
                resizeMode: 'cover',
                width: undefined,
                height: undefined,
                borderRadius: 150 / 2,
              }}
            />
            <TouchableOpacity
              style={{
                position: 'absolute',
                right: 0,
                bottom: 0,
                width: 40,
                height: 40,
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#FFCD61',
              }}
              onPress={handleChoosePhoto}>
              <Icon name="pencil-alt" style={{color: 'black'}} />
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: 'row',
              // borderWidth: 1,
              alignItems: 'center',
              marginTop: 20,
              // marginBottom: 10,
            }}>
            <RadioButton
              value="first"
              status={checked === 'Wanita' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('Wanita')}
            />
            <Text
              style={{
                color: '#393939',
                fontFamily: 'Nunito-Regular',
                fontWeight: '400',
                lineHeight: 18,
                fontSize: 14,
                marginRight: 20,
              }}
              onPress={() => setChecked('Wanita')}>
              Female
            </Text>
            <RadioButton
              value="second"
              status={checked === 'Pria' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('Pria')}
            />
            <Text
              style={{
                color: '#393939',
                fontFamily: 'Nunito-Regular',
                fontWeight: '400',
                lineHeight: 18,
                fontSize: 14,
              }}
              onPress={() => setChecked('Pria')}>
              Male
            </Text>
          </View>
        </View>

        <View
          style={{
            padding: 20,
          }}>
          <Text
            style={{
              fontFamily: 'Nunito-Regular',
              fontWeight: '700',
              color: '#b8b8b8',
            }}>
            Name :
          </Text>
          <View
            style={{
              flexDirection: 'row',
              borderWidth: 1,
              borderRadius: 10,
              borderColor: '#DADADA',
              marginTop: 20,
            }}>
            <TextInput
              placeholder="Input Name"
              placeholderTextColor="grey"
              value={editModeName ? name : profile.name}
              onFocus={() => {
                setEditModeName(true);
              }}
              onChangeText={text => {
                setName(text);
              }}
              style={{
                // borderWidth: 1,
                width: '100%',
                color: 'black',
                paddingStart: 20,
              }}
            />
          </View>
        </View>

        <View
          style={{
            padding: 20,
          }}>
          <Text
            style={{
              fontFamily: 'Nunito-Regular',
              fontWeight: '700',
              color: '#b8b8b8',
            }}>
            Email Address :
          </Text>
          <View
            style={{
              flexDirection: 'row',
              borderWidth: 1,
              borderRadius: 10,
              borderColor: '#DADADA',
              marginTop: 20,
            }}>
            <TextInput
              placeholder="Input Email Address"
              placeholderTextColor="grey"
              value={editModeEmail ? email : profile.email}
              onFocus={() => {
                setEditModeEmail(true);
              }}
              onChangeText={text => {
                setEmail(text);
              }}
              style={{
                // borderWidth: 1,
                width: '100%',
                color: 'black',
                paddingStart: 20,
              }}
            />
          </View>
        </View>

        <View
          style={{
            padding: 20,
          }}>
          <Text
            style={{
              fontFamily: 'Nunito-Regular',
              fontWeight: '700',
              color: '#b8b8b8',
            }}>
            Phone Number :
          </Text>
          <View
            style={{
              flexDirection: 'row',
              borderWidth: 1,
              borderRadius: 10,
              borderColor: '#DADADA',
              marginTop: 20,
            }}>
            <TextInput
              placeholder="Input Phone Number"
              placeholderTextColor="grey"
              value={editModePhone ? phone : profile.phone}
              onFocus={() => {
                setEditModePhone(true);
              }}
              onChangeText={text => {
                setPhone(text);
              }}
              style={{
                // borderWidth: 1,
                width: '100%',
                color: 'black',
                paddingStart: 20,
              }}
            />
          </View>
        </View>

        <View
          style={{
            padding: 20,
          }}>
          <Text
            style={{
              fontFamily: 'Nunito-Regular',
              fontWeight: '700',
              color: '#b8b8b8',
            }}>
            Date of Birth :
          </Text>
          <View
            style={{
              flexDirection: 'row',
              borderWidth: 1,
              borderRadius: 10,
              borderColor: '#DADADA',
              marginTop: 20,
            }}>
            <TouchableOpacity
              style={{
                width: '80%',
                height: 52,
                borderRadius: 10,
                // backgroundColor: '#DFDEDE',
                opacity: 0.8,
                color: 'black',
                justifyContent: 'center',
                paddingStart: 20,
              }}
              onPress={() => {
                setIsDateVisible(true);
              }}>
              {selectDate.length > 0 ? (
                <Text
                  style={{
                    fontFamily: 'Nunito-Regular',
                    fontWeight: '400',
                    color: '#000',
                  }}>
                  {selectDate}
                </Text>
              ) : (
                <Text
                  style={{
                    fontFamily: 'Nunito-Regular',
                    fontWeight: '400',
                    color: '#000',
                  }}>
                  {profile.birtday}
                </Text>
              )}
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDateVisible}
              mode="date"
              onConfirm={handleConfirmDate}
              onCancel={() => {
                setIsDateVisible(false);
                setSelectDate('');
              }}
            />
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
              }}>
              <Icon
                name="calendar-day"
                size={30}
                style={{
                  color: '#DADADA',
                }}
              />
            </View>
          </View>
        </View>

        <View
          style={{
            padding: 20,
          }}>
          <Text
            style={{
              fontFamily: 'Nunito-Regular',
              fontWeight: '700',
              color: '#b8b8b8',
            }}>
            Address :
          </Text>
          <View
            style={{
              flexDirection: 'row',
              borderWidth: 1,
              borderRadius: 10,
              borderColor: '#DADADA',
              marginTop: 20,
            }}>
            <TextInput
              placeholder="Input Address"
              placeholderTextColor="grey"
              value={editModeAddress ? address : profile.address}
              onFocus={() => {
                setEditModeAddress(true);
              }}
              onChangeText={text => {
                setAddress(text);
              }}
              style={{
                // borderWidth: 1,
                width: '100%',
                color: 'black',
                paddingStart: 20,
              }}
            />
          </View>
        </View>

        <View
          style={{
            padding: 20,
            // backgroundColor: 'red',
          }}>
          <TouchableOpacity
            style={{
              width: '100%',
              height: 57,
              backgroundColor: '#FFCD61',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
            }}
            onPress={handleSave}>
            <Text
              style={{
                color: '#393939',
                fontFamily: 'Nunito-Regular',
                fontWeight: '800',
                fontSize: 24,
                lineHeight: 33,
              }}>
              Save Change
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

export default UpdateProfile;
