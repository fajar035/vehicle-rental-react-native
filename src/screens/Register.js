import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TextInput,
  ScrollView,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import {registerApi} from '../utils/auth';
import bgRegister from '../assets/Images/bg-signup.png';
import Button from '../components/Button';
import Modal from '../components/Modal';

const {height} = Dimensions.get('screen');

const Register = ({navigation}) => {
  const [body, setBody] = useState({
    email: '',
    noHp: '',
    password: '',
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const goLogin = () => {
    navigation.navigate('Login');
  };

  const cbIsError = text => {
    setIsError(text);
  };
  const cbIsSuccess = text => {
    setIsSuccess(text);
  };
  console.log('ISeRROR', isError);
  const onSubmit = () => {
    registerApi(body)
      .then(res => {
        console.log(res);
        // alert('Sign Up Successfuly');
        cbIsSuccess(true);
      })
      .catch(err => {
        console.log(err.response);
        // alert('Email is already registered');

        setIsSuccess(false);
        cbIsError(true);
      });
  };

  return (
    <ScrollView>
      <Modal
        title="Registration is successful, please login"
        onModal={isSuccess}
        navigation={navigation}
        type="register success"
        cb={cbIsSuccess}
      />
      <Modal
        title="Please fill in the correct"
        onModal={isError}
        navigation={navigation}
        type="register fail"
        cb={cbIsError}
      />
      <ImageBackground
        source={bgRegister}
        resizeMode="cover"
        style={styles.container}>
        <View style={styles.wrapperTitle}>
          <Text style={styles.text}>LET’S HAVE SOME RIDE</Text>
        </View>

        <View style={styles.wrapperInput}>
          <TextInput
            keyboardType="email-address"
            placeholder="Email"
            placeholderTextColor="#393939"
            style={styles.input}
            onChangeText={text => {
              setBody({
                ...body,
                email: text,
              });
            }}
          />
          <TextInput
            keyboardType="phone-pad"
            placeholder="Mobile Phone"
            placeholderTextColor="#393939"
            style={styles.input}
            onChangeText={text => {
              setBody({
                ...body,
                noHp: text,
              });
            }}
          />
          <TextInput
            secureTextEntry={true}
            // keyboardType="visible-password"
            returnKeyType="go"
            placeholder="Password"
            placeholderTextColor="#393939"
            style={styles.input}
            onChangeText={text => {
              setBody({
                ...body,
                password: text,
              });
            }}
          />
        </View>

        <View style={styles.wrapperBtn}>
          <Button title="Sign Up" link={onSubmit} />
        </View>

        <View style={styles.wrapperTextSignUp}>
          <Text style={styles.noAccount}>Already have an account? </Text>
          <Text style={styles.signUp} onPress={goLogin}>
            Login now
          </Text>
        </View>
      </ImageBackground>
    </ScrollView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height: height,
    width: null,
    resizeMode: 'cover',
    // borderWidth: 1,
    // marginBottom: 40,
  },
  wrapperTitle: {
    width: 200,
    marginTop: 120,
    marginStart: 20,
  },
  text: {
    fontSize: 36,
    fontFamily: 'Roboto-Regular',
    fontWeight: '900',
    lineHeight: 42,
    letterSpacing: -0.2,
    color: '#fff',
  },
  wrapperInput: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 174,
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
  wrapperBtn: {
    marginTop: 40,
    marginBottom: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapperTextSignUp: {
    flexDirection: 'row',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noAccount: {
    fontFamily: 'Nunito-Reglar',
    color: '#fff',
    fontSize: 14,
  },
  signUp: {
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    color: '#fff',
  },
});
