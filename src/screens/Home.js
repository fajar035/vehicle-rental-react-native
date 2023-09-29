/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Loading from '../components/Loading';
import imgBanner from '../assets/Images/banner-home.png';
import noImageVehicle from '../assets/Images/noImageVehicle.jpeg';
import {getVehiclesApi, getVehiclesPopularApi} from '../utils/vehicles';
import {removeDuplicate} from '../helpers';

const Home = ({navigation, route}) => {
  const auth = useSelector(state => state.auth);
  const role = auth.authUser.role;
  const [cars, setCars] = useState([]);
  const [bike, setBike] = useState([]);
  const [popular, setPopular] = useState([]);
  const [motorBike, setMotorBike] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState('');

  const handleOnChangeSearch = newValue => {
    setSearch(newValue);
  };

  const getCategoryUrl = type => ({
    page: 1,
    limit: 5,
    filterCategory: type,
  });

  const getVehicle = useCallback(async () => {
    try {
      const resCars = ((await getVehiclesApi(getCategoryUrl('car'))) || {}).data
        .result;
      const resBike = ((await getVehiclesApi(getCategoryUrl('bike'))) || {})
        .data.result;
      const resMotorBike = (
        (await getVehiclesApi(getCategoryUrl('motorbike'))) || {}
      ).data.result;
      const resPopular = await (await getVehiclesPopularApi()).data.result;

      setCars(resCars);
      setBike(resBike);
      setPopular(removeDuplicate(resPopular));
      setMotorBike(resMotorBike);
      setIsLoading(false);
    } catch (err) {
      console.log('ERROR GET VEHICLES : ', err);
      alert('Server error occurred ...');
      throw err;
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);

    getVehicle();

    const unsubcribe = navigation.addListener('focus', () => {
      console.log('Refresh Data ..');
      console.log('Page Home');
      getVehicle();
      setSearch('');
    });
    return unsubcribe;
  }, [navigation, setSearch, getVehicle]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <ScrollView>
          <View
            style={{
              position: 'relative',
              alignItems: 'center',
            }}>
            <Image source={imgBanner} style={{width: '100%'}} />
            <TextInput
              placeholder="Search Vehicles"
              placeholderTextColor="#fff"
              style={{
                position: 'absolute',
                width: '90%',
                borderWidth: 1,
                backgroundColor: 'black',
                opacity: 0.5,
                fontFamily: 'Nunito-Regular',
                fontWeight: 'bold',
                borderRadius: 10,
                marginTop: 70,
                color: 'white',
                paddingStart: 20,
              }}
              onChangeText={handleOnChangeSearch}
              onSubmitEditing={() => {
                navigation.navigate('SearchScreen', {
                  keyword: search,
                });
              }}
            />

            <View style={{position: 'absolute', width: '90%'}}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('AddItemScreen');
                }}
                style={
                  role === '2'
                    ? {
                        backgroundColor: '#FFCD61',
                        height: 54,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 140,
                        borderRadius: 10,
                        display: 'flex',
                      }
                    : {
                        backgroundColor: '#FFCD61',
                        height: 54,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 140,
                        borderRadius: 10,
                        display: 'none',
                      }
                }>
                <Text
                  style={{
                    fontFamily: 'Nunito-Regular',
                    fontWeight: 'bold',
                    color: '#393939',
                  }}>
                  Add New Item
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* POPULAR */}
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 20,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 20,
                width: '90%',
              }}>
              <Text
                style={{
                  color: 'black',
                  fontFamily: 'Nunito-Regular',
                  fontWeight: 'bold',
                  fontSize: 22,
                }}>
                Popular
              </Text>
              <View
                style={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: 80,
                  flexDirection: 'row',
                }}
                onStartShouldSetResponder={() =>
                  navigation.navigate('CategoryVehicle', {
                    popular,
                    category: 'popular',
                  })
                }>
                <Text
                  style={{
                    color: 'black',
                    fontFamily: 'Nunito-Regular',
                    fontSize: 12,
                    fontWeight: 'bold',
                  }}>
                  View More
                </Text>
                <Icon
                  name="chevron-right"
                  style={{color: 'black', fontSize: 15}}
                />
              </View>
            </View>

            <ScrollView horizontal style={{padding: 20}}>
              {popular.length > 0 &&
                popular.map((item, idx) => {
                  const photo = JSON.parse(item.photo)[0];
                  return (
                    <View
                      style={{
                        width: 265,
                        height: 168,
                        borderRadius: 15,
                        marginRight: 20,
                        overflow: 'hidden',
                        borderWidth: 1,
                        borderColor: '#393939',
                      }}
                      key={idx}
                      onTouchEnd={() => {
                        console.log('ITEM : ', item);
                        navigation.navigate('DetailVehicleScreen', {
                          id: item.id_vehicle,
                        });
                      }}>
                      <Image
                        onError={() => noImageVehicle}
                        source={{uri: photo}}
                        style={{
                          width: undefined,
                          height: undefined,
                          resizeMode: 'cover',
                          flex: 1,
                        }}
                      />
                    </View>
                  );
                })}
            </ScrollView>
          </View>

          {/* CARS */}
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',

                marginTop: 20,
                width: '90%',
              }}>
              <Text
                style={{
                  color: 'black',
                  fontFamily: 'Nunito-Regular',
                  fontWeight: 'bold',
                  fontSize: 22,
                }}>
                Cars
              </Text>
              <View
                style={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: 80,
                  flexDirection: 'row',
                }}
                onStartShouldSetResponder={() =>
                  navigation.navigate('CategoryVehicle', {
                    category: 'cars',
                    cars: cars,
                  })
                }>
                <Text
                  style={{
                    color: 'black',
                    fontFamily: 'Nunito-Regular',
                    fontSize: 12,
                    fontWeight: 'bold',
                  }}>
                  View More
                </Text>
                <Icon
                  name="chevron-right"
                  style={{color: 'black', fontSize: 15}}
                />
              </View>
            </View>

            <ScrollView horizontal style={{padding: 20}}>
              {cars.length > 0 &&
                cars.map((item, idx) => {
                  const photo = JSON.parse(item.photo)[0];
                  return (
                    <View
                      style={{
                        width: 265,
                        height: 168,
                        borderRadius: 15,
                        marginRight: 20,
                        overflow: 'hidden',
                        borderWidth: 1,
                        borderColor: '#393939',
                      }}
                      key={idx}
                      onTouchEnd={() => {
                        navigation.navigate('DetailVehicleScreen', {
                          id: item.id,
                        });
                      }}>
                      <Image
                        onError={() => noImageVehicle}
                        source={{uri: photo}}
                        style={{
                          width: undefined,
                          height: undefined,
                          resizeMode: 'cover',
                          flex: 1,
                        }}
                      />
                    </View>
                  );
                })}
            </ScrollView>
          </View>

          {/* MOTORBIKE */}
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',

                marginTop: 20,
                width: '90%',
              }}>
              <Text
                style={{
                  color: 'black',
                  fontFamily: 'Nunito-Regular',
                  fontWeight: 'bold',
                  fontSize: 22,
                }}>
                Motor Bike
              </Text>
              <View
                style={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: 80,
                  flexDirection: 'row',
                }}
                onStartShouldSetResponder={() =>
                  navigation.navigate('CategoryVehicle', {
                    category: 'motorbike',
                    motorbike: motorBike,
                  })
                }>
                <Text
                  style={{
                    color: 'black',
                    fontFamily: 'Nunito-Regular',
                    fontSize: 12,
                    fontWeight: 'bold',
                  }}>
                  View More
                </Text>
                <Icon
                  name="chevron-right"
                  style={{color: 'black', fontSize: 15}}
                />
              </View>
            </View>

            <ScrollView horizontal style={{padding: 20}}>
              {motorBike.length > 0 &&
                motorBike.map((item, idx) => {
                  const photo = JSON.parse(item.photo)[0];
                  // console.log('ITEM-MOTORBIKE >>>>', item);
                  return (
                    <View
                      style={{
                        width: 265,
                        height: 168,
                        borderRadius: 15,
                        marginRight: 20,
                        overflow: 'hidden',
                        borderWidth: 1,
                        borderColor: '#393939',
                      }}
                      key={idx}
                      onTouchEnd={() => {
                        navigation.navigate('DetailVehicleScreen', {
                          id: item.id,
                        });
                      }}>
                      <Image
                        onError={() => noImageVehicle}
                        source={{uri: photo}}
                        style={{
                          width: undefined,
                          height: undefined,
                          resizeMode: 'cover',
                          flex: 1,
                        }}
                      />
                    </View>
                  );
                })}
            </ScrollView>
          </View>

          {/* BIKE */}
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 20,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 20,
                width: '90%',
              }}>
              <Text
                style={{
                  color: 'black',
                  fontFamily: 'Nunito-Regular',
                  fontWeight: 'bold',
                  fontSize: 22,
                }}>
                Bike
              </Text>
              <View
                style={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: 80,
                  flexDirection: 'row',
                }}
                onStartShouldSetResponder={() =>
                  navigation.navigate('CategoryVehicle', {
                    bike: bike,
                    category: 'bike',
                  })
                }>
                <Text
                  style={{
                    color: 'black',
                    fontFamily: 'Nunito-Regular',
                    fontSize: 12,
                    fontWeight: 'bold',
                  }}>
                  View More
                </Text>
                <Icon
                  name="chevron-right"
                  style={{color: 'black', fontSize: 15}}
                />
              </View>
            </View>

            <ScrollView horizontal style={{padding: 20}}>
              {bike.length > 0 &&
                bike.map((item, idx) => {
                  const photo = JSON.parse(item.photo)[0];
                  return (
                    <View
                      style={{
                        width: 265,
                        height: 168,
                        borderRadius: 15,
                        marginRight: 20,
                        overflow: 'hidden',
                        borderWidth: 1,
                        borderColor: '#393939',
                      }}
                      key={idx}
                      onTouchEnd={() => {
                        navigation.navigate('DetailVehicleScreen', {
                          id: item.id,
                        });
                      }}>
                      <Image
                        onError={() => noImageVehicle}
                        source={{uri: photo}}
                        style={{
                          width: undefined,
                          height: undefined,
                          resizeMode: 'cover',
                          flex: 1,
                        }}
                      />
                    </View>
                  );
                })}
            </ScrollView>
          </View>
        </ScrollView>
      )}
    </>
  );
};

export default Home;
