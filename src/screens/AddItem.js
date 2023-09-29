/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import * as ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import defaultPhoto from '../assets/Images/defaultFotoUpload.png';
import {Picker} from '@react-native-picker/picker';
import {useSelector} from 'react-redux';
import {addVehicleApi} from '../utils/vehicles';
import Modal from '../components/Modal';

const AddItem = ({navigation}) => {
  const auth = useSelector(state => state.auth.authUser);
  const {token} = auth;

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [locationSelected, setLocationSelected] = useState(1);
  const [categorySelected, setCategorySelected] = useState(1);
  const [counter, setCounter] = useState(0);
  const [photo, setPhoto] = useState(null);
  const [isSuccessAdd, setIsSuccessAdd] = useState(false);
  const [isWrongFill, setIsWrongFill] = useState(false);

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

  const cbWrongFill = text => {
    setIsWrongFill(text);
  };

  const cbSuccessAdd = text => {
    setIsSuccessAdd(text);
  };

  // console.log(JSON.parse(token));
  const handleSaveProduct = () => {
    const body = new FormData();
    if (photo !== null) {
      body.append('uploadPhotoVehicle', {
        uri: photo.uri,
        type: photo.type,
        name: JSON.stringify(photo.fileName),
      });
    }
    if (name) {
      body.append('name', name);
    }
    if (description) {
      body.append('description', description);
    }
    body.append('capacity', 4);
    if (price) {
      body.append('price', price);
    }
    if (counter) {
      body.append('stock', counter);
    }
    if (locationSelected) {
      body.append('location', locationSelected);
    }
    if (categorySelected) {
      body.append('category', categorySelected);
    }
    body.append('status', 1);

    if (photo !== null && name.length !== 0 && description.length !== 0) {
      addVehicleApi(body, token)
        .then(res => {
          console.log(res);
          if (res) {
            cbSuccessAdd(true);
          }
        })
        .catch(err => {
          if (err) {
            cbWrongFill(true);
          }
        })
        .done();
      console.log('SUCCESS');
    } else {
      console.log('ADD VEHICLE FAILED');
      cbWrongFill(true);
    }
  };
  // const { uri } = photo;

  return (
    <ScrollView>
      <Modal
        title="Please fill in all the correct"
        onModal={isWrongFill}
        type="data null"
        cb={cbWrongFill}
      />
      <Modal
        title="Successfully added your vehicle"
        onModal={isSuccessAdd}
        type="add success"
        cb={cbSuccessAdd}
        navigation={navigation}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 20,
        }}
        onStartShouldSetResponder={() => {
          navigation.replace('HomeScreen');
        }}>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
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
            Add new item
          </Text>
        </View>
        <Text
          style={{
            color: '#B8BECD',
            fontSize: 18,
            fontFamily: 'Nunito-Regular',
            fontWeight: 'bold',
            alignItems: 'center',
          }}
          onPress={() => {
            setPhoto(null);
            setName('');
            setPrice('');
            setDescription('');
            setLocationSelected(1);
            setCategorySelected(1);
            setCounter(0);
          }}>
          Cansel
        </Text>
      </View>

      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          // borderWidth: 1,
          marginTop: 20,
          marginBottom: 30,
        }}>
        <View
          style={{
            width: 150,
            height: 150,
            borderRadius: 150 / 2,
            position: 'relative',
          }}>
          <Image
            source={photo !== null ? {uri: photo.uri} : defaultPhoto}
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
            <Icon name="plus" style={{color: 'black'}} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <View style={{width: '90%', marginBottom: 20}}>
          <Text
            style={{
              color: 'black',
              fontFamily: 'Nunito-Regular',
              fontWeight: 'bold',
              fontSize: 17,
            }}>
            Name
          </Text>
          <TextInput
            placeholder="Input the product name min. 30 characters"
            placeholderTextColor="#9F9F9F"
            style={{
              borderBottomWidth: 1,
              borderBottomColor: '#C4C4C4',
              color: 'black',
            }}
            onChangeText={text => setName(text)}
          />
        </View>

        <View style={{width: '90%', marginBottom: 20}}>
          <Text
            style={{
              color: 'black',
              fontFamily: 'Nunito-Regular',
              fontWeight: 'bold',
              fontSize: 17,
            }}>
            Price
          </Text>
          <TextInput
            keyboardType="numeric"
            placeholder="Input the product price"
            placeholderTextColor="#9F9F9F"
            style={{
              borderBottomWidth: 1,
              borderBottomColor: '#C4C4C4',
              color: 'black',
            }}
            onChangeText={text => setPrice(text)}
          />
        </View>

        <View style={{width: '90%', marginBottom: 20}}>
          <Text
            style={{
              color: 'black',
              fontFamily: 'Nunito-Regular',
              fontWeight: 'bold',
              fontSize: 17,
            }}>
            Description
          </Text>
          <TextInput
            placeholder="Type delivery information"
            placeholderTextColor="#9F9F9F"
            style={{
              borderBottomWidth: 1,
              borderBottomColor: '#C4C4C4',
              color: 'black',
            }}
            onChangeText={text => setDescription(text)}
          />
        </View>

        <View style={{width: '90%', marginBottom: 20}}>
          <Text
            style={{
              color: 'black',
              fontFamily: 'Nunito-Regular',
              fontWeight: 'bold',
              fontSize: 17,
            }}>
            Location
          </Text>

          <View style={{borderBottomWidth: 1, borderBottomColor: '#C4C4C4'}}>
            <Picker
              dropdownIconColor="black"
              selectedValue={locationSelected}
              style={{
                height: 50,
                width: '100%',
                color: 'black',
              }}
              onValueChange={itemValue => setLocationSelected(itemValue)}>
              <Picker.Item label="Jakarta" value="1" />
              <Picker.Item label="Depok" value="2" />
              <Picker.Item label="Bogor" value="3" />
              <Picker.Item label="Bandung" value="4" />
              <Picker.Item label="Banten" value="6" />
              <Picker.Item label="Tanggerang" value="7" />
              <Picker.Item label="Cianjur" value="8" />
            </Picker>
          </View>
        </View>

        <View style={{width: '90%', marginBottom: 20}}>
          <Text
            style={{
              color: 'black',
              fontFamily: 'Nunito-Regular',
              fontWeight: 'bold',
              fontSize: 17,
            }}>
            Category
          </Text>

          <View style={{borderBottomWidth: 1, borderBottomColor: '#C4C4C4'}}>
            <Picker
              dropdownIconColor="black"
              selectedValue={categorySelected}
              style={{
                height: 50,
                width: '100%',
                color: 'black',
              }}
              onValueChange={itemValue => setCategorySelected(itemValue)}>
              <Picker.Item label="Bike" value="1" />
              <Picker.Item label="Motor Bike" value="2" />
              <Picker.Item label="Cars" value="3" />
            </Picker>
          </View>
        </View>

        <View
          style={{
            marginBottom: 40,
            width: '90%',
            height: 35,
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: 'black',
              fontFamily: 'Nunito-Regular',
              fontSize: 17,
              fontWeight: 'bold',
            }}>
            Available Stock :
          </Text>

          <View
            style={{
              flexDirection: 'row',
              width: 140,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{
                width: 30,
                height: 30,
                borderRadius: 30 / 2,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#FFCD61',
              }}
              onPress={() => {
                setCounter(counter > 0 ? counter - 1 : 0);
              }}>
              <Icon name="minus" style={{color: 'black'}} />
            </TouchableOpacity>

            <Text
              style={{
                color: 'black',
                fontFamily: 'Poppins-Regular',
                fontWeight: 'bold',
                fontSize: 15,
              }}>
              {counter}
            </Text>

            <TouchableOpacity
              style={{
                width: 30,
                height: 30,
                borderRadius: 30 / 2,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#FFCD61',
              }}
              onPress={() => {
                setCounter(counter + 1);
              }}>
              <Icon name="plus" style={{color: 'black'}} />
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            width: '90%',
            marginBottom: 50,
          }}>
          <TouchableOpacity
            style={{
              borderRadius: 10,
              width: '100%',
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#FFCD61',
            }}
            onPress={handleSaveProduct}>
            <Text
              style={{
                color: '#393939',
                fontFamily: 'Nunito-Regular',
                fontWeight: 'bold',
                fontSize: 17,
              }}>
              Save Product
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default AddItem;
