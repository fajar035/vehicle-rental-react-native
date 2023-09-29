/* eslint-disable react-native/no-inline-styles */
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TextInput,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import bgForgot from '../assets/Images/bg-reset-password.png';
import Button from '../components/Button';
import Icon from 'react-native-vector-icons/FontAwesome5';
const {height} = Dimensions.get('window');

function Forgot({navigation}) {
  const [resendCode] = useState(false);
  return (
    <ScrollView>
      <ImageBackground
        source={bgForgot}
        resizeMode="cover"
        style={styles.container}>
        <View style={styles.wrapperBack}>
          <Text style={styles.icon}>
            <Icon name="chevron-left" size={22} />
          </Text>
          <Text
            style={styles.back}
            onPress={() => {
              navigation.goBack();
            }}>
            Back
          </Text>
        </View>

        <View style={styles.wrapperTitle}>
          <Text style={styles.text}>THAT’S OKAY, WE GOT YOUR BACK</Text>
        </View>

        <View style={styles.wrapperDesc}>
          <Text style={styles.desc}>
            Enter your email to get reset password code. If you don’t receive
            any code{' '}
            <Text style={{fontWeight: '700', textDecorationLine: 'underline'}}>
              Resend Code
            </Text>
          </Text>
        </View>

        <View style={styles.wrapperInput}>
          <TextInput
            placeholder="Enter your email adress"
            placeholderTextColor="#393939"
            style={styles.input}
            // onChangeText={getUsername}
          />
        </View>

        <View style={styles.wrapperBtn}>
          <Button title="Send Code" />
        </View>

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{
              width: '90%',
              height: 51,
              backgroundColor: '#FFff',
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
              // position: 'absolute',
              display: resendCode ? 'flex' : 'none',
            }}
            // onPress={link}
          >
            <Text
              style={{
                color: '#393939',
                fontFamily: 'Nunito-Regular',
                fontWeight: '900',
                fontSize: 18,
              }}>
              {/* {title} */}
              Resend Code
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </ScrollView>
  );
}

export default Forgot;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height,
    width: null,
    resizeMode: 'cover',
  },
  wrapperBack: {
    width: '30%',
    flexDirection: 'row',
    marginTop: 20,
    padding: 20,
  },

  back: {
    fontSize: 18,
    marginStart: 30,
    fontFamily: 'Nunito-Regular',
    fontWeight: '700',
    color: '#fff',
  },

  wrapperTitle: {
    marginTop: 70,
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },

  wrapperDesc: {
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 240,
  },

  desc: {
    width: '90%',
    color: '#fff',
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    textAlign: 'center',
    // borderWidth: 1,
  },

  text: {
    width: '70%',
    fontSize: 36,
    fontFamily: 'Roboto-Regular',
    fontWeight: '900',
    lineHeight: 42,
    letterSpacing: -0.2,
  },
  wrapperInput: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  input: {
    width: '90%',
    borderRadius: 10,
    marginTop: 25,
    padding: 14,
    opacity: 0.8,
    backgroundColor: '#DFDEDE',
    color: '#393939',
    fontFamily: 'Nunito-Regular',
    fontWeight: 'bold',
  },
  forgot: {
    paddingStart: 22,
    fontFamily: 'Nunito-Regular',
    textDecorationLine: 'underline',
    color: '#fff',
  },
  wrapperBtn: {
    marginTop: 40,
    marginBottom: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },

  wrapperTextSignUp: {
    flexDirection: 'row',
    // paddingStart: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noAccount: {fontFamily: 'Nunito-Reglar', fontWeight: '700', fontSize: 14},
  signUp: {textDecorationLine: 'underline', fontWeight: 'bold'},
});
