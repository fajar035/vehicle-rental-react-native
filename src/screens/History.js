/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  Pressable,
  Image,
} from 'react-native';
// import CheckBox from '@react-native-community/checkbox';
import {Checkbox} from 'react-native-paper';
import React, {useState, useEffect, useCallback} from 'react';
import {useSelector} from 'react-redux';
import {historyByUserApi} from '../utils/history';
import {getUserByIdApi} from '../utils/users';
import jwt_decode from 'jwt-decode';
import Loading from '../components/Loading';
import {API_URL} from '@env';
const History = ({navigation}) => {
  const [user, setUser] = useState({}); // FOR TOKEN IS NOT LOGIN
  const [userById, setUserById] = useState({}); // FOR HISTORY USER BY ID
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notLogin, setNotLogin] = useState(false);
  const [isSelected, setIsSelected] = useState([]);
  const [checked, setChecked] = useState([]);
  const [isNameNull, setIsNameNull] = useState(false);

  const token = useSelector(state => state.auth.authUser.token);
  const name = userById.name;

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

  const getUserById = useCallback(() => {
    getUserByIdApi(token)
      .then(res => {
        // console.log(res);
        setUserById(res.data.result);
      })
      .catch(err => console.log(err));
  }, [token]);

  const getHistoryByName = useCallback(() => {
    if (name !== undefined) {
      historyByUserApi(name)
        .then(res => {
          // console.log(res);
          setHistory(res.data.result);

          setIsLoading(false);
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      // setIsLoading(true);
      // if (name === undefined) {
      //   setIsNameNull(true);
      // }
    }
  }, [name]);

  // console.log(isSelected);
  // useEffect(() => {
  //   if (history.length === 0) {
  //     // setIsLoading(true);
  //     console.log('BELUM ADA HISTORY');
  //   }
  //   getUserById();
  // }, [getUserById, history]);

  useEffect(() => {
    // const tokenDecoded = token === null ? setNotLogin(true) : token;
    // if (token) {
    //   setUser(jwt_decode(tokenDecoded));
    //   setNotLogin(false);
    // }
    getUserById();
    getHistoryByName();
  }, [token, getUserById, getHistoryByName]);

  useEffect(() => {
    const unsubcribe = navigation.addListener('focus', () => {
      console.log('Refresh Data ..');
      getUserById();
      const tokenDecoded = token === null ? setNotLogin(true) : token;
      if (token) {
        setUser(jwt_decode(tokenDecoded));
        setNotLogin(false);
      }

      getHistoryByName();
      console.log('HISTORY>>>', history);
    });
    return unsubcribe;
  }, [token, navigation, getUserById, getHistoryByName, history]);

  const dateLocal = iso8601 => {
    const date = new Date(iso8601).toString();
    const newDate = new Date(date);
    const day = ('0' + newDate.getDate()).slice(-2);
    const mnth = ('0' + (newDate.getMonth() + 1)).slice(-2);
    const year = newDate.getFullYear();
    return [day, mnth, year].join('-');
  };

  // console.log(history);

  return (
    <>
      <Text
        style={{
          textAlign: 'center',
          color: '#000',
          padding: 50,
          // borderWidth: 1,
          backgroundColor: '#fff',
          fontFamily: 'Nunito-Regular',
          fontWeight: '700',
          fontSize: 28,
        }}>
        History Order
      </Text>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: '#fff',
          padding: 20,
          paddingStart: '40%',
          // marginBottom: 30,
        }}>
        <Text
          style={{
            color: 'grey',
            marginEnd: '40%',
            fontFamily: 'Nunito-Regular',
            fontSize: 14,
            fontWeight: '600',
          }}>
          A Week ago
        </Text>
        {isSelected ? (
          <Text
            style={{
              color: 'grey',
              fontFamily: 'Nunito-Regular',
              fontSize: 14,
              fontWeight: '600',
            }}>
            Delete
          </Text>
        ) : (
          <Text
            style={{
              color: 'grey',
              fontFamily: 'Nunito-Regular',
              fontSize: 14,
              fontWeight: '600',
            }}>
            Select
          </Text>
        )}
      </View>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <ScrollView>
            {/* MODAL NOT LOGIN */}
            <Modal
              animationType="slide"
              transparent={true}
              visible={notLogin}
              onRequestClose={() => {
                setNotLogin(!notLogin);
              }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#fff',
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
                    Kamu belum login, harap login untuk history anda
                  </Text>
                  <Pressable
                    style={{
                      backgroundColor: '#FFCD61',
                      borderRadius: 10,
                      width: 100,
                      padding: 15,
                      elevation: 2,
                    }}
                    onPress={() => {
                      setNotLogin(!notLogin);

                      navigation.replace('AuthScreen');
                    }}>
                    <Text
                      style={{
                        color: 'black',
                        fontWeight: 'bold',
                        textAlign: 'center',
                        elevation: 2,
                      }}>
                      Ok
                    </Text>
                  </Pressable>
                </View>
              </View>
            </Modal>

            {/* MODAL IS NAME NULL */}
            <Modal
              animationType="slide"
              transparent={true}
              visible={isNameNull}
              onRequestClose={() => {
                setIsNameNull(!isNameNull);
              }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#fff',
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
                    Kamu belum mengisi nama kamu, harap update profile kamu dulu
                    ya ^_^
                  </Text>
                  <Pressable
                    style={{
                      backgroundColor: '#FFCD61',
                      borderRadius: 10,
                      width: 100,
                      padding: 15,
                      elevation: 2,
                    }}
                    onPress={() => {
                      setIsNameNull(!isNameNull);

                      navigation.replace('TabStack');
                    }}>
                    <Text
                      style={{
                        color: 'black',
                        fontWeight: 'bold',
                        textAlign: 'center',
                        elevation: 2,
                      }}>
                      Ok
                    </Text>
                  </Pressable>
                </View>
              </View>
            </Modal>

            {history.map((item, idx) => {
              // console.log('ITEM-BIKE >>> ', item);
              const photo = JSON.parse(item.photo);

              return (
                <View
                  style={{
                    // borderWidth: 1,
                    flexDirection: 'row',
                    // marginTop: 20,
                    padding: 20,
                    alignItems: 'center',
                  }}
                  key={idx}>
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

                  <View style={{width: '45%'}}>
                    <Text
                      style={{
                        fontFamily: 'Nunito-Regular',
                        fontSize: 14,
                        fontWeight: 'bold',
                        color: 'black',
                        marginBottom: 5,
                      }}>
                      {item.vehicle}
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Nunito-Regular',
                        fontSize: 12,
                        fontWeight: 'normal',
                        color: 'black',
                        marginBottom: 5,
                      }}>
                      {dateLocal(item.booking_date) +
                        ' to ' +
                        dateLocal(item.return_date)}
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Nunito-Regular',
                        fontSize: 14,
                        fontWeight: 'bold',
                        color: 'black',
                        marginBottom: 5,
                      }}>
                      {`Payment : Rp ${numberToRupiah(item.price)}`}
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Nunito-Regular',
                        fontSize: 13,
                        fontWeight: 'bold',
                        color: 'green',
                        marginBottom: 5,
                      }}>
                      Has been returned
                    </Text>
                  </View>

                  <View
                    style={{
                      // borderWidth: 1,
                      marginStart: 25,
                    }}>
                    <Checkbox />
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </>
      )}
    </>
  );
};

export default History;
