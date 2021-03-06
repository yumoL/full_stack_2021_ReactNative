import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import FormikTextInput from './FormikTextInput';
import Text from './Text';
import useSignIn from '../hooks/useSignIn';

const SignInForm = ({ onSubmit }) => {
  const styles = StyleSheet.create({
    submitButton: {
      backgroundColor: '#33BDFF',
      padding: 10,
      margin: 15,
      height: 40,
      textAlign: 'center'
    },
    submitButtonText: {
      color: 'white'
    }
  });
  return (
    <View>
      <FormikTextInput name="username" placeholder="username" />
      <FormikTextInput secureTextEntry={true} name="password" placeholder="password" />
      <Pressable onPress={onSubmit} style={styles.submitButton}>
        <Text color="bar">Sign In</Text>
      </Pressable>
    </View>
  );
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required'),
});

const SignIn = () => {
  const [signIn] = useSignIn();
  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      const { data } = await signIn({username, password});
      console.log(data);
    } catch (e) {
      console.error(e);
    }
  };

  const initialValues = {
    username: "",
    password: ""
  };

  return (
    <View>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
      </Formik>
    </View>
  );
};

export default SignIn;