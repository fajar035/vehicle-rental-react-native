/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import NotLogin from './NotLogin';
import {logoutAction} from '../redux/actions/auth';
import {getUserByIdApi} from '../utils/users';
import Loading from '../components/Loading';
import Icon from 'react-native-vector-icons/FontAwesome5';
import photoDefault from '../assets/Images/picUserDefault.jpg';
import {API_URL} from '@env';
import Modal from '../components/Modal';

const height = Dimensions.get('screen').height;

const Profile = ({navigation}) => {
  const auth = useSelector(state => state.auth);
  const token = auth.authUser.token;
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState({});
  const [isLogoutSuccess, setIsLogoutSuccess] = useState(false);

  useEffect(() => {
    if (token) {
      return setIsLogin(true);
    }
    if (!token) {
      return setIsLogin(false);
    }
  }, [auth, navigation, token]);

  const getProfile = useCallback(() => {
    getUserByIdApi(token)
      .then(res => {
        console.log(res.data.result);
        setProfile(res.data.result);
      })
      .catch(err => {
        console.log(err);
      });
  }, [token]);

  useEffect(() => {
    const unsubcribe = navigation.addListener('focus', () => {
      console.log('Refresh Data ..');
      getProfile();
      setIsLoading(false);
    });
    return unsubcribe;
  }, [getProfile, navigation]);
  console.log(isLoading);

  const ProfileLogin = () => {
    const config = {
      headers: {
        'x-access-token': token,
      },
    };
    const dispatch = useDispatch();

    const handlerLogout = () => {
      dispatch(logoutAction(config)).then(res => {
        if (res.action.payload.status === 200) {
          navigation.navigate('TabStack');
        }
      });
      cbIsLogoutSuccess(true);
      // alert('LOGOUT');
    };
    // console.log('PROFILE LENGHT', Object.values(profile).length);
    // console.log('PROFILE >>>', profile);
    return (
      <>
        {isLoading ? (
          <Loading />
        ) : (
          <ScrollView
            style={{
              height: height,
              // justifyContent: 'space-between',
              // backgroundColor: 'red',
            }}>
            <View
              style={{
                flexDirection: 'row',
                // borderBottomWidth: 1,
                padding: 20,
                backgroundColor: '#fff',
                alignItems: 'center',
                marginBottom: 20,
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
                  marginRight: 30,
                  width: 100,
                  height: 100,
                }}>
                <Image
                  source={
                    !profile.photo
                      ? photoDefault
                      : {uri: API_URL + profile.photo}
                  }
                  style={{
                    resizeMode: 'cover',
                    width: undefined,
                    height: undefined,
                    flex: 1,
                    borderRadius: 50,
                  }}
                />
              </View>

              <Text
                style={{
                  color: '#393939',
                  fontFamily: 'Nunito-Regular',
                  fontWeight: '700',
                  lineHeight: 30,
                  fontSize: 22,
                }}>
                {profile.name === null ? 'Name : -' : profile.name}
              </Text>
            </View>

            <View
              style={{
                padding: 20,
                // backgroundColor: 'red',
              }}>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  // borderWidth: 1,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 40,
                }}>
                <Text
                  style={{
                    color: '#393939',
                    fontFamily: 'Nunito-Regular',
                    fontWeight: '700',
                    lineHeight: 25,
                    fontSize: 18,
                  }}>
                  Your favourite
                </Text>
                <Icon
                  name="chevron-right"
                  size={18}
                  style={{color: '#999999'}}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  // borderWidth: 1,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 40,
                }}>
                <Text
                  style={{
                    color: '#393939',
                    fontFamily: 'Nunito-Regular',
                    fontWeight: '700',
                    lineHeight: 25,
                    fontSize: 18,
                  }}>
                  FAQ
                </Text>
                <Icon
                  name="chevron-right"
                  size={18}
                  style={{color: '#999999'}}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  // borderWidth: 1,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 40,
                }}>
                <Text
                  style={{
                    color: '#393939',
                    fontFamily: 'Nunito-Regular',
                    fontWeight: '700',
                    lineHeight: 25,
                    fontSize: 18,
                  }}>
                  Help
                </Text>
                <Icon
                  name="chevron-right"
                  size={18}
                  style={{color: '#999999'}}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  // borderWidth: 1,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 40,
                }}
                onPress={() => {
                  navigation.navigate('UpdateProfileScreen', {
                    profile: profile,
                  });
                }}>
                <Text
                  style={{
                    color: '#393939',
                    fontFamily: 'Nunito-Regular',
                    fontWeight: '700',
                    lineHeight: 25,
                    fontSize: 18,
                  }}>
                  Update Profile
                </Text>
                <Icon
                  name="chevron-right"
                  size={18}
                  style={{color: '#999999'}}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  // borderWidth: 1,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 40,
                }}
                onPress={() => {
                  navigation.navigate('UpdatePasswordScreen', {
                    profile: profile,
                  });
                }}>
                <Text
                  style={{
                    color: '#393939',
                    fontFamily: 'Nunito-Regular',
                    fontWeight: '700',
                    lineHeight: 25,
                    fontSize: 18,
                  }}>
                  Update Password
                </Text>
                <Icon
                  name="chevron-right"
                  size={18}
                  style={{color: '#999999'}}
                />
              </TouchableOpacity>
            </View>

            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                // backgroundColor: 'blue',
              }}>
              <TouchableOpacity
                style={{
                  // borderWidth: 1,
                  marginTop: 150,
                  width: '90%',
                  height: 57,
                  borderRadius: 10,
                  backgroundColor: '#FFCD61',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={handlerLogout}>
                <Text
                  style={{
                    color: '#393939',
                    fontFamily: 'Nunito-Regular',
                    fontWeight: '800',
                    fontSize: 24,
                  }}>
                  Log Out
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}
      </>
    );
  };
  const cbIsLogoutSuccess = text => {
    setIsLogoutSuccess(text);
  };
  return (
    <View>
      <Modal
        title="Logout Success"
        navigation={navigation}
        type="logout success"
        onModal={isLogoutSuccess}
        cb={cbIsLogoutSuccess}
      />
      {!isLogin ? <NotLogin navigation={navigation} /> : <ProfileLogin />}
    </View>
  );
};

export default Profile;
