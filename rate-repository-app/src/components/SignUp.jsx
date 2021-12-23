import React from 'react';
import { View, Pressable } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import FormikTextInput from './FormikTextInput';
import Text from './Text';
import useSignUp from '../hooks/useSignUp';
import useSignIn from '../hooks/useSignIn';
import { formStyles } from './Theme';

const SignUpForm = ({ onSubmit }) => {
  return (
    <View>
      <FormikTextInput name="username" placeholder="username" />
      <FormikTextInput secureTextEntry={true} name="password" placeholder="password" />
      <FormikTextInput secureTextEntry={true} name="passwordConfirm" placeholder="Confirm your password" />
      <Pressable onPress={onSubmit} style={formStyles.submitButton} testID="submitButton">
        <Text color="bar" style={{ textAlign: 'center' }}>Sign Up</Text>
      </Pressable>
    </View>
  );
};

export const SignUpPage = ({ onSubmit }) => {
  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .min(3, 'The length of username should be between 3 and 30')
      .max(30, 'The length of username should be between 3 and 30')
      .required('Username is required'),
    password: yup
      .string()
      .min(5, 'The length of password should be between 5 and 50')
      .max(50, 'The length of password should be between 5 and 50')
      .required('Password is required'),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref('password'), null],'Password confirmation does not match')
      .required('Please confirm your password')
  });

  const initialValues = {
    username: "",
    password: "",
    passwordConfirm: ""
  };

  return (
    <View>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
      </Formik>
    </View>
  );
};


const SignUp = () => {
  const [signUp] = useSignUp();
  const [signIn] = useSignIn();
  const onSubmit = async(values) => {
    const { username, password } = values;
    try {
      const { data } = await signUp({username, password});
      if(data){
        const { data }=await signIn({username, password});
        console.log('signin after signup', data);
      }
    } catch (e) {
      console.error(e);
    }
  };
  return <SignUpPage onSubmit={onSubmit} />;
};

export default SignUp;