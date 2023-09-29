/* eslint-disable react-native/no-inline-styles */
import {View, Text, ScrollView, Image, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Photo from '../assets/Images/category_bike.png';
import React from 'react';

const RoomChat = ({navigation}) => {
  return (
    <ScrollView>
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
          // borderWidth: 1,
          width: '50%',
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
          Vespa Bali
        </Text>
      </View>

      <View
        style={{
          padding: 20,
        }}>
        <View
          style={{
            // padding: 20,
            // borderWidth: 1,
            marginBottom: 50,
            borderColor: 'grey',
            borderRadius: 10,
            flexDirection: 'row',
            backgroundColor: '#fff',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 5,
            },
            shadowOpacity: 0.34,
            shadowRadius: 6.27,

            elevation: 10,
          }}>
          <View
            style={{
              width: 200,
              // borderWidth: 1,
              height: 130,
              borderRadius: 10,
            }}>
            <Image
              source={Photo}
              style={{
                width: undefined,
                height: undefined,
                resizeMode: 'cover',
                flex: 1,
                borderRadius: 10,
              }}
            />
          </View>
          <View
            style={{
              padding: 10,
              paddingStart: 20,
              flex: 1,
              height: 130,
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                fontFamily: 'Nunito-Regular',
                fontSize: 18,
                color: 'black',
                fontWeight: '700',
              }}>
              Vespa Matic
            </Text>
            <Text
              style={{
                fontFamily: 'Nunito-Regular',
                fontSize: 14,
                color: 'green',
                fontWeight: '700',
              }}>
              Available
            </Text>
            <Text
              style={{
                fontFamily: 'Nunito-Regular',
                fontSize: 14,
                color: 'black',
                fontWeight: '700',
              }}>
              Rp. 120.000/day
            </Text>
            <View
              style={{
                // borderWidth: 1,
                alignItems: 'flex-end',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  width: 60,
                  height: 30,
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
          </View>
        </View>

        <View style={{alignItems: 'flex-end', marginBottom: 20}}>
          <View
            style={{
              backgroundColor: '#393939',
              width: '70%',
              padding: 20,
              borderRadius: 15,
            }}>
            <Text
              style={{
                fontFamily: 'Poppoins-Regular',
                fontWeight: '400',
                color: '#fff',
                lineHeight: 18,
              }}>
              Hey, can I book 2 vespa for January 18 to 21?
            </Text>
          </View>
          <View
            style={{
              // backgroundColor: 'red',
              width: '70%',
              padding: 10,
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontWeight: '400',
                lineHeight: 15,
                color: '#9F9F9F',
              }}>
              Read [12.04 PM]
            </Text>
          </View>
        </View>

        <View style={{alignItems: 'flex-start', marginBottom: 20}}>
          <View
            style={{
              backgroundColor: '#FFCD61',
              width: '70%',
              padding: 20,
              borderRadius: 15,
            }}>
            <Text
              style={{
                fontFamily: 'Poppoins-Regular',
                fontWeight: '400',
                color: '#4E4E4E',
                lineHeight: 18,
              }}>
              Hey thanks for asking, it’s available now you can do reservation
              and pay for the vespa so they’re ready for you
            </Text>
          </View>
          <View
            style={{
              // backgroundColor: 'red',
              width: '70%',
              padding: 10,
              alignItems: 'flex-end',
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontWeight: '400',
                lineHeight: 15,
                color: '#9F9F9F',
              }}>
              12.10 PM
            </Text>
          </View>
        </View>

        <View
          style={{
            // borderWidth: 1,
            marginTop: 90,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              // backgroundColor: 'red',
              marginBottom: 20,
            }}>
            <View
              style={{
                padding: 10,
                borderWidth: 1,
                borderRadius: 30,
                backgroundColor: '#dadada6e',
              }}>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  fontWeight: '400',
                  fontSize: 12,
                  color: '#393939',
                }}>
                Okay, please wait
              </Text>
            </View>

            <View
              style={{
                padding: 10,
                borderWidth: 1,
                borderRadius: 30,
                backgroundColor: '#dadada6e',
              }}>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  fontWeight: '400',
                  fontSize: 12,
                  color: '#393939',
                }}>
                Thank you!
              </Text>
            </View>

            <View
              style={{
                padding: 10,
                borderWidth: 1,
                borderRadius: 30,
                backgroundColor: '#dadada6e',
              }}>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  fontWeight: '400',
                  fontSize: 12,
                  color: '#393939',
                }}>
                Your Welcome
              </Text>
            </View>
          </View>
          <View
            style={{
              // borderWidth: 1,
              padding: 5,
              borderRadius: 10,
              flexDirection: 'row',
              backgroundColor: '#DFDEDE',
            }}>
            <TextInput
              placeholder="Type a message"
              placeholderTextColor="#000"
              style={{
                width: '85%',
                // borderWidth: 1,
                paddingStart: 20,
                color: '#000',
                fontFamily: 'Nunito-Regular',
                fontWeight: '400',
                lineHeight: 22,
                fontSize: 16,
              }}
            />
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
              }}>
              <Icon name="camera" size={30} style={{color: 'grey'}} />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default RoomChat;
