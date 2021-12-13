import React from 'react';
import { StyleSheet } from 'react-native';
import { useField } from 'formik';

import TextInput from './TextInput';
import Text from './Text';
import theme from './Theme';


const FormikTextInput = ({ name, secureTextEntry, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  const styles = StyleSheet.create({
    input: {
      margin: 15,
      height: 40,
      borderColor: theme.colors.fieldColor,
      borderWidth: 1
   },
   errorText: {
    marginTop: 5,
  },
  });

  return (
    <>
      <TextInput
        styles={styles}
        secureTextEntry={secureTextEntry}
        onChangeText={value => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        {...props}
      />
      {showError && <Text color="error" style={styles.errorText}>{meta.error}</Text>}
    </>
  );
};

export default FormikTextInput;