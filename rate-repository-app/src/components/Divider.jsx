import React from "react";
import {View, StyleSheet} from 'react-native';

const dividerStyles = StyleSheet.create({
  container: {
    height: 10,
    backgroundColor: '#F8F9F9'
  }
});

const Divider = () => {
  return (<View style={dividerStyles.container}>
  </View>);
};

export default Divider;

