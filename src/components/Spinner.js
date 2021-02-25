import React, {useContext} from 'react';
import {ActivityIndicator, StyleSheet, View, StatusBar} from 'react-native';

export default function Spinner() {
  StatusBar.setBarStyle('light-content');

  return (
    <View style={[styles.container]}>
      <ActivityIndicator size="large" color="white" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
