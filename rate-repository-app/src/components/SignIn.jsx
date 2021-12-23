import React from 'react';
import { View, Pressable } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import FormikTextInput from './FormikTextInput';
import Text from './Text';
import useSignIn from '../hooks/useSignIn';
import { formStyles } from './Theme';

const SignInForm = ({ onSubmit }) => {
  return (
    <View>
      <FormikTextInput name="username" placeholder="username" testID="usernameField" />
      <FormikTextInput secureTextEntry={true} name="password" placeholder="password" testID="passwordField" />
      <Pressable onPress={onSubmit} style={formStyles.submitButton} testID="submitButton">
        <Text color="bar" style={{ textAlign: 'center' }}>Sign In</Text>
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

export const SignInPage = ({ onSubmit }) => {
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

const SignIn = () => {
  const [signIn] = useSignIn();
  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      const { data } = await signIn({ username, password });
      console.log(data);
    } catch (e) {
      console.error(e);
    }
  };
  return <SignInPage onSubmit={onSubmit} />;
};

export default SignIn;