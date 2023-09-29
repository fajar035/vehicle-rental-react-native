/* eslint-disable no-shadow */
/* eslint-disable radix */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  Modal,
  Alert,
} from 'react-native';
import Loading from '../components/Loading';
import {Picker} from '@react-native-picker/picker';
import {getVehicleByIdApi} from '../utils/vehicles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import {editVehicleApi, deleteVehicleAPi} from '../utils/vehicles';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {numberToRupiah} from '../helpers';

const width = Dimensions.get('window').width;

const DetailVehicle = ({navigation, route}) => {
  const auth = useSelector(state => state.auth);
  const role = auth.authUser.role;
  const token = auth.authUser.token;
  const {id} = route.params;
  const [vehicle, setVehicle] = useState([]);
  const [photo, setPhoto] = useState('');
  const [counter, setCounter] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [statusStock, setStatusStock] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [isDateVisible, setIsDateVisible] = useState(false);
  const [day, setDay] = useState('1');
  const [selectDate, setSelectDate] = useState('');

  const handlerUpdateItemAdmin = () => {
    console.log('UPDATE!!!');
    const body = {
      stock: counter,
      status: statusStock,
    };

    editVehicleApi(token, body, id)
      .then(res => {
        if (res.status === 200) {
          setModalVisible(true);
          // console.log(res);
          setMessage(res.data.message);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handlerDeleteVehicleAdmin = () => {
    deleteVehicleAPi(id)
      .then(res => {
        if (res.status === 200) {
          setModalVisible(true);
          // console.log(res);
          setMessage(res.data.message);
          console.log('Delete Berhasil ^_^');
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleConfirmDate = date => {
    const dateLocal = iso8601 => {
      const date = new Date(iso8601).toString();
      const newDate = new Date(date);
      const day = ('0' + newDate.getDate()).slice(-2);
      const mnth = ('0' + (newDate.getMonth() + 1)).slice(-2);
      const year = newDate.getFullYear();
      return [day, mnth, year].join('-');
    };
    setSelectDate(dateLocal(date));
    setIsDateVisible(false);
  };

  useEffect(() => {
    setIsLoading(true);
    getVehicleByIdApi(id)
      .then(res => {
        console.log('res : ', res);
        setVehicle(res.data.result[0]);
        setPhoto(JSON.parse(res.data.result[0].photo)[0]);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  }, [id]);
  // console.log('vehicles-Detail', JSON.parse(vehicle.photo)[0]);
  // console.log('ROLE', role + ' ' + 'TIPE', typeof role);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <ScrollView>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Modal
              animationType="slide"
              // transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
              }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
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
                    {message}
                  </Text>
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#FFCD61',
                      borderRadius: 10,
                      width: 100,
                      padding: 15,
                      elevation: 2,
                    }}
                    onPress={() => {
                      setModalVisible(!modalVisible);
                      setEditMode(false);
                      navigation.navigate('HomeScreen');
                    }}>
                    <Text
                      style={{
                        color: 'black',
                        fontWeight: 'bold',
                        textAlign: 'center',
                        elevation: 2,
                        fontFamily: 'Poppins-Regular',
                        fontSize: 20,
                      }}>
                      OK
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>

          <ImageBackground
            style={{height: 300, width: width}}
            source={{uri: photo}}>
            <View
              style={{
                // borderWidth: 5,
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
                padding: 30,
              }}>
              <Icon
                name="chevron-left"
                size={30}
                style={{color: '#fff'}}
                onPress={() => {
                  navigation.goBack();
                }}
              />
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
          </ImageBackground>

          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
              marginBottom: 20,
            }}>
            <View style={{width: '90%'}}>
              <View
                style={{
                  flex: 1,
                  // borderWidth: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: 'Nunito-Regular',
                    fontWeight: '700',
                    color: 'black',
                    fontSize: 28,
                  }}>
                  {vehicle.name}
                </Text>

                <TouchableOpacity
                  style={{
                    // borderWidth: 1,
                    width: 40,
                    height: 40,
                    padding: 10,
                    borderRadius: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#FFCD61',
                    display: editMode ? 'flex' : 'none',
                  }}
                  onPress={handlerDeleteVehicleAdmin}>
                  <Icon2
                    name="trash-o"
                    style={{color: 'black', fontSize: 18, fontWeight: '700'}}
                  />
                </TouchableOpacity>
              </View>
              <Text
                style={{
                  fontFamily: 'Nunito-Regular',
                  fontWeight: '700',
                  color: 'black',
                  fontSize: 28,
                  marginBottom: 10,
                }}>
                {`Rp. ${numberToRupiah(parseInt(vehicle.price))} /day`}
              </Text>
              <Text
                style={{
                  fontFamily: 'Nunito-Regular',
                  fontWeight: '400',
                  color: 'black',
                  fontSize: 16,
                }}>
                {`Max for ${vehicle.capacity} person`}
              </Text>
              <Text
                style={{
                  fontFamily: 'Nunito-Regular',
                  fontWeight: '400',
                  color: 'black',
                  fontSize: 16,
                  marginBottom: 10,
                }}>
                No Prepayment
              </Text>
              <Text
                style={{
                  fontFamily: 'Nunito-Regular',
                  fontWeight: '700',
                  color: 'green',
                  fontSize: 16,
                }}>
                {vehicle.status}
              </Text>

              <View
                style={{
                  marginTop: 20,
                  flexDirection: 'row',
                  // justifyContent: 'space-around',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    // borderWidth: 1,
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#FFC7A7',
                    marginRight: 40,
                  }}>
                  <Icon
                    name="map-marker-alt"
                    style={{color: '#F8A170', fontSize: 18}}
                  />
                </View>
                <Text
                  style={{
                    fontFamily: 'Nunito-Regular',
                    fontWeight: '600',
                    fontSize: 16,
                    color: 'grey',
                  }}>
                  {vehicle.location}
                </Text>
              </View>

              <View
                style={{
                  marginTop: 20,
                  flexDirection: 'row',
                  // justifyContent: 'space-around',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    // borderWidth: 1,
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#FFC7A7',
                    marginRight: 40,
                  }}>
                  <Icon
                    name="running"
                    style={{color: '#F8A170', fontSize: 18}}
                  />
                </View>
                <Text
                  style={{
                    fontFamily: 'Nunito-Regular',
                    fontWeight: '600',
                    fontSize: 16,
                    color: 'grey',
                  }}>
                  3.2 miles from your location
                </Text>
              </View>

              {role === '2' ? (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 20,
                    // borderWidth: 1,
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Poppins-Regular',
                      fontWeight: '700',
                      fontSize: 18,
                      color: '#393939',
                    }}>
                    Stock
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
                      {!editMode ? vehicle.stock : counter}
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
              ) : (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 20,
                    // borderWidth: 1,
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Poppins-Regular',
                      fontWeight: '700',
                      fontSize: 18,
                      color: '#393939',
                    }}>
                    {vehicle.category === 'Cars'
                      ? 'Select Cars'
                      : vehicle.category === 'Motorbike'
                      ? 'Select Motor Bike'
                      : 'Select Bikes'}
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
                        setCounter(
                          vehicle.stock > counter ? counter + 1 : counter,
                        );
                      }}>
                      <Icon name="plus" style={{color: 'black'}} />
                    </TouchableOpacity>
                  </View>
                </View>
              )}

              <View
                style={{
                  width: '100%',
                  marginBottom: 5,
                  marginTop: 20,
                  borderWidth: 1,
                  borderRadius: 10,
                  backgroundColor: '#393939',
                  opacity: 0.8,
                  color: 'black',
                  display: editMode ? 'flex' : 'none',
                }}>
                <Picker
                  dropdownIconColor="white"
                  selectedValue={statusStock}
                  style={{
                    height: 50,
                    width: '100%',
                    color: '#fff',
                  }}
                  onValueChange={itemValue => setStatusStock(itemValue)}>
                  <Picker.Item label="Available" value="1" />
                  <Picker.Item label="Full Booked" value="2" />
                </Picker>
              </View>

              {role === '2' ? (
                editMode ? (
                  <TouchableOpacity
                    style={{
                      width: '100%',
                      height: 70,
                      backgroundColor: '#FFCD61',
                      marginTop: 20,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 10,
                    }}
                    onPress={() => {
                      handlerUpdateItemAdmin();
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Nunito-Regular',
                        fontSize: 24,
                        fontWeight: '800',
                        color: '#393939',
                      }}>
                      Update Item
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={{
                      width: '100%',
                      height: 70,
                      backgroundColor: '#FFCD61',
                      marginTop: 20,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 10,
                    }}
                    onPress={() => {
                      editMode ? setEditMode(false) : setEditMode(true);
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Nunito-Regular',
                        fontSize: 24,
                        fontWeight: '800',
                        color: '#393939',
                      }}>
                      Edit Item
                    </Text>
                  </TouchableOpacity>
                )
              ) : (
                <>
                  <View
                    style={{
                      // borderWidth: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 20,
                    }}>
                    <TouchableOpacity
                      style={{
                        width: '60%',
                        height: 70,
                        borderRadius: 10,
                        backgroundColor: '#DFDEDE',
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
                          Select Date
                        </Text>
                      )}
                    </TouchableOpacity>
                    <DateTimePickerModal
                      isVisible={isDateVisible}
                      mode="date"
                      onConfirm={handleConfirmDate}
                      onCancel={() => {
                        setIsDateVisible(false);
                      }}
                    />

                    <View
                      style={{
                        width: '35%',
                        height: 70,

                        borderRadius: 10,
                        backgroundColor: '#DFDEDE',
                        opacity: 0.8,
                        color: 'black',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Picker
                        dropdownIconColor="#000"
                        selectedValue={day}
                        style={{
                          width: '100%',
                          color: '#000',
                          borderWidth: 1,
                        }}
                        onValueChange={itemValue => {
                          setDay(itemValue);
                        }}>
                        <Picker.Item label="1 Day" value="1" />
                        <Picker.Item label="2 Day" value="2" />
                        <Picker.Item label="3 Day" value="3" />
                        <Picker.Item label="4 Day" value="4" />
                        <Picker.Item label="5 Day" value="5" />
                        <Picker.Item label="6 Day" value="6" />
                        <Picker.Item label="7 Day" value="7" />
                      </Picker>
                    </View>
                  </View>

                  <TouchableOpacity
                    style={{
                      width: '100%',
                      height: 70,
                      backgroundColor: '#FFCD61',
                      marginTop: 20,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 10,
                    }}
                    onPress={() => {
                      navigation.navigate('ReservationScreen', {
                        vehicles: vehicle,
                        day: day,
                        selectDate: selectDate,
                        qty: counter,
                      });
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Nunito-Regular',
                        fontSize: 24,
                        fontWeight: '800',
                        color: '#393939',
                      }}>
                      Reservation
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        </ScrollView>
      )}
    </>
  );
};

export default DetailVehicle;
