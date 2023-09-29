/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import {getVehiclesSearchApi} from '../utils/vehicles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/Entypo';
import {API_URL} from '@env';
import Loading from '../components/Loading';

const SearchVehicle = ({navigation, route}) => {
  const [search, setSearch] = useState(route.params.keyword);
  const [result, setResult] = useState([]);
  const [isDataNull, setDataNUll] = useState(false);
  const [filter, setFilter] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // console.log('CHILD =', search);

  const cbFilter = text => {
    setFilter(text);
  };

  const cbSearch = text => {
    setSearch(text);
  };
  console.log('FILTER >>>', filter);
  useEffect(() => {
    setIsLoading(true);
    getVehiclesSearchApi(search, filter)
      .then(res => {
        setResult(res.data.result);
        setDataNUll(false);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setDataNUll(true);
        setIsLoading(false);
      });
  }, [search, filter]);

  // console.log('RESULT', isDataNull);

  return (
    <>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          // marginTop: 20,
          // paddingTop: 20,
        }}>
        <TextInput
          placeholder="Search Vehicles"
          placeholderTextColor="black"
          style={{
            borderBottomWidth: 2,
            borderBottomColor: '#DFDEDE',
            width: '100%',
            padding: 20,
            paddingTop: 40,
            fontFamily: 'Nunito-Regular',
            fontSize: 18,
            color: '#393939',
            fontWeight: '400',
          }}
          onChangeText={text => setSearch(text)}
          value={search}
        />
        <TouchableOpacity
          style={{
            width: '100%',
            borderBottomWidth: 2,
            marginTop: 20,
            padding: 20,
            marginBottom: 30,
            flexDirection: 'row',
            borderBottomColor: '#DFDEDE',
          }}
          onPress={() => {
            navigation.navigate('FilterScreen', {
              filter: filter,
              cbFilter: cbFilter,
              search: search,
              cbSearch: cbSearch,
            });
          }}>
          <Icon
            name="filter"
            size={20}
            style={{color: '#DFDEDE', marginRight: 20}}
          />
          <Text
            style={{
              fontFamily: 'Nunito-Regular',
              fontWeight: '400',
              color: '#616167',
              fontSize: 16,
            }}>
            Filter Search
          </Text>
        </TouchableOpacity>
      </View>
      {isLoading ? (
        <Loading />
      ) : (
        <View
          style={{
            // borderWidth: 1,
            // backgroundColor: 'red',
            height: 600,
            // marginBottom: 100,
          }}>
          {isDataNull ? (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                // borderWidth: 1,
                padding: 50,
              }}>
              <Text
                style={{
                  fontFamily: 'Nunito-Regular',
                  fontWeight: '700',
                  color: '#616167',
                  fontSize: 20,
                  marginBottom: 50,
                }}>
                Data Not Found
              </Text>
              <Icon2 name="emoji-sad" size={100} />
            </View>
          ) : (
            <FlatList
              keyExtractor={(item, index) => `${index}`}
              data={result}
              renderItem={({item}) => listItem(navigation, item)}
            />
          )}
        </View>
      )}
    </>
  );
};

const listItem = (navigation, item) => {
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

  const photo = JSON.parse(item.photo);

  return (
    <TouchableOpacity
      style={{
        // borderWidth: 1,
        flexDirection: 'row',
        marginTop: 20,
        padding: 20,
        alignItems: 'center',
      }}
      onPress={() => {
        navigation.navigate('DetailVehicleScreen', {id: item.id});
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
          source={{uri: API_URL + photo[0]}}
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
          {item.name}
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
};

export default SearchVehicle;
