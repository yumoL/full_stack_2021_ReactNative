import React from 'react';
import { TextInput as NativeTextInput, StyleSheet } from 'react-native';
import theme from './Theme';


const styles = StyleSheet.create({
  border: {
    margin: 15,
    height: 40,
    borderColor: theme.colors.fieldColor,
    borderWidth: 1
  },
  colorNormal: {
    borderColor: theme.colors.fieldColor
  },
  colorError: {
    borderColor: theme.colors.error
  }
});

const TextInput = ({ style, error, secureTextEntry, ...props }) => {
  const textInputStyle = [
    styles.border,
    error ? styles.colorError : styles.colorNormal,
    style
  ];

  return <NativeTextInput secureTextEntry={secureTextEntry} style={textInputStyle} {...props} />;
};

export default TextInput;