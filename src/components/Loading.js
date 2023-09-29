import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import React from 'react';

export default function Loading() {
  return (
    <View style={styles.container}>
      <View style={[styles.containerCircle]}>
        {/* <ActivityIndicator size="small" /> */}
        <ActivityIndicator size="large" color="#FFCD61" />
        {/* <ActivityIndicator size="small" color="#e3a2ee" /> */}
        {/* <ActivityIndicator size="large" color="#ffa800" /> */}
        {/* <ActivityIndicator size="small" color="#0ef6be" /> */}
      </View>

      <Text style={styles.loading}>Loading ...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#fff',
  },
  containerCircle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 40,
  },
  loading: {
    fontFamily: 'Poppins-Regular',
    fontSize: 40,
    color: '#3c3541',
    textAlign: 'center',
  },
});
