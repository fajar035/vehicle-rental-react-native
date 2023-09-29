/* eslint-disable react-native/no-inline-styles */
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Picker} from '@react-native-picker/picker';

const FilterVehicle = ({navigation, route}) => {
  const setFilter = route.params.cbFilter;
  const setSearch = route.params.cbSearch;
  const [type, setType] = useState('');

  useEffect(() => {
    setFilter(type);
  }, [setFilter, type]);

  return (
    <>
      <View
        style={{
          borderBottomWidth: 2,
          borderBottomColor: '#DFDEDE',
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 40,
        }}>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            // borderWidth: 1,
            width: '38%',
            padding: 20,
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
            Filter
          </Text>
        </View>

        <TouchableOpacity
          style={{
            // borderWidth: 1,
            backgroundColor: '#DFDEDE',
            paddingTop: 10,
            paddingBottom: 10,
            paddingRight: 20,
            paddingLeft: 20,
            marginRight: 20,
            borderRadius: 10,
          }}
          onPress={() => {
            setFilter('');
            setSearch('');
          }}>
          <Text
            style={{
              fontFamily: 'Nunito-Regular',
              fontWeight: '600',
              fontSize: 14,
              color: '#616167',
            }}>
            RESET
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View
          style={{
            padding: 20,
            // borderWidth: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: '#393939',
              fontFamily: 'Nunito-Regular',
              fontWeight: '600',
              lineHeight: 25,
              fontSize: 18,
            }}>
            Type
          </Text>
          <View
            style={{
              flexDirection: 'row',
              // borderWidth: 1,
              width: '40%',
              alignItems: 'center',
              justifyContent: 'space-between',
              // paddingRight: 20,
            }}>
            <Picker
              dropdownIconColor="#efefef"
              selectedValue={type}
              style={{
                height: 50,
                width: '95%',
                color: '#999999',
                // backgroundColor: 'red',
              }}
              onValueChange={itemValue => setType(itemValue)}>
              {/* <Picker.Item label="" value="" /> */}
              <Picker.Item label="Bike" value="Bike" />
              <Picker.Item label="Motorbike" value="Motorbike" />
              <Picker.Item label="Cars" value="Cars" />
            </Picker>
            <Icon name="chevron-right" style={{color: '#999999'}} size={20} />
          </View>
        </View>

        <View
          style={{
            padding: 20,
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#FFCD61',
              width: '100%',
              height: 70,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
            }}
            onPress={() => {
              navigation.goBack();
            }}>
            <Text
              style={{
                color: '#393939',
                fontFamily: 'Nunito-Regular',
                fontWeight: '800',
                fontSize: 24,
                lineHeight: 33,
              }}>
              Apply
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

export default FilterVehicle;
