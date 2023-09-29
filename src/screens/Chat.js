/* eslint-disable react-native/no-inline-styles */
import {View, Text, TextInput, ScrollView} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Chat = ({navigation}) => {
  const [search, setSearch] = useState('');
  return (
    <ScrollView>
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
          // borderWidth: 1,
          width: '35%',
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
          Chat
        </Text>
      </View>

      <View style={{padding: 40}}>
        <View
          style={{
            padding: 10,
            paddingStart: 20,
            marginBottom: 50,
            flexDirection: 'row',
            // justifyContent: 'space-between',
            alignItems: 'center',
            // borderWidth: 1,
            borderRadius: 20,
            backgroundColor: '#D1D1D1',
          }}>
          <Icon
            name="search"
            size={20}
            style={{
              fontFamily: 'Nunito-Regular',
              // fontSize: 12,
              marginEnd: 10,
              marginStart: 10,
              color: '#393939',
              display: search.length > 0 ? 'none' : 'flex',
            }}
          />
          <TextInput
            style={{
              // borderWidth: 1,
              // width: '100%',
              flex: 1,
              color: 'black',
              paddingStart: 20,
              fontSize: 14,
              fontFamily: 'Nunito-Regular',
              fontWeight: '400',
            }}
            placeholderTextColor="#000000"
            placeholder="Search Chat"
            onChangeText={text => {
              setSearch(text);
            }}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            borderBottomWidth: 3,
            borderBottomColor: '#DADADA',
            // paddingTop: 20,
            paddingBottom: 20,
            marginBottom: 20,
          }}
          onStartShouldSetResponder={() => {
            navigation.navigate('RoomChatScreen');
          }}>
          <View
            style={{
              // backgroundColor: 'red',
              width: '70%',
              height: 70,
              justifyContent: 'space-around',
              flexDirection: 'column',
            }}>
            <Text
              style={{
                color: 'black',
                fontFamily: 'Poppins-Regular',
                fontSize: 17,
                fontWeight: '700',
              }}>
              Vespa Rental Jogja
            </Text>
            <Text
              style={{
                color: 'black',
                fontFamily: 'Poppins-Regular',
                fontSize: 15,
                fontWeight: '700',
              }}>
              Hey, there are 3 vespa left
            </Text>
          </View>
          <View
            style={{
              // backgroundColor: 'blue',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  fontWeight: '400',
                  color: '#9A9A9D',
                }}>
                Just Now
              </Text>
              <View
                style={{
                  // borderWidth: 1,
                  width: 20,
                  height: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                  backgroundColor: '#FFCD61',
                }}>
                <Text
                  style={{
                    fontFamily: 'Poppins-Regular',
                    fontWeight: '700',
                    color: '#000',
                  }}>
                  1
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            borderBottomWidth: 3,
            borderBottomColor: '#DADADA',
            // paddingTop: 20,
            paddingBottom: 20,
            marginBottom: 20,
          }}
          onStartShouldSetResponder={() => {
            navigation.navigate('RoomChatScreen');
          }}>
          <View
            style={{
              // backgroundColor: 'red',
              width: '70%',
              height: 70,
              justifyContent: 'space-around',
              flexDirection: 'column',
            }}>
            <Text
              style={{
                color: 'black',
                fontFamily: 'Poppins-Regular',
                fontSize: 17,
                fontWeight: '700',
              }}>
              Car Rental
            </Text>
            <Text
              style={{
                color: 'black',
                fontFamily: 'Poppins-Regular',
                fontSize: 14,
                fontWeight: '400',
              }}>
              Okay, thank you for the good service
            </Text>
          </View>
          <View
            style={{
              // backgroundColor: 'blue',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  fontWeight: '400',
                  color: '#9A9A9D',
                }}>
                Yesterday
              </Text>
              <View
                style={{
                  // borderWidth: 1,
                  width: 20,
                  height: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                  backgroundColor: '#FFCD61',
                  display: 'none',
                }}>
                <Text
                  style={{
                    fontFamily: 'Poppins-Regular',
                    fontWeight: '700',
                    color: '#000',
                  }}>
                  1
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      <Text
        style={{
          textAlign: 'center',
          color: '#9A9A9D',
          padding: 50,
          fontFamily: 'Poppins-Regular',
          fontWeight: '400',
        }}>
        You have no conversation left
      </Text>
    </ScrollView>
  );
};

export default Chat;
