import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import Text from './Text';
import FormikTextInput from './FormikTextInput';
import useAddReview from '../hooks/useAddReview';
import theme from './Theme';

const AddReviewForm = ({ onSubmit }) => {
  const styles = StyleSheet.create({
    submitButton: {
      backgroundColor: theme.colors.fieldColor,
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
      <FormikTextInput name="ownerName" placeholder="Repository owner name" />
      <FormikTextInput name="repositoryName" placeholder="Repository name" />
      <FormikTextInput name="rating" placeholder="Rating between 0 and 100" />
      <FormikTextInput name="text" placeholder="Review" multiline={true} />
      <Pressable onPress={onSubmit} style={styles.submitButton} testID="submitButton">
        <Text color="bar" style={{ textAlign: 'center' }}>Create a review</Text>
      </Pressable>
    </View>
  );
};

const AddReviewPage = ({ onSubmit }) => {
  const validationSchema = yup.object().shape({
    ownerName: yup
      .string()
      .required('Owner name is required'),
    repositoryName: yup
      .string()
      .required('Repository name is required'),
    rating: yup
      .number()
      .typeError('You must specify a number')
      .min(0, 'Minimum rating is 0')
      .min(100, 'Maximum rating is 100')
      .required('Rating is required')
  });

  const initialValues = {
    ownerName: "",
    repositoryName: "",
    rating: "",
    text: ""
  };

  return (
    <View>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        {({ handleSubmit }) => <AddReviewForm onSubmit={handleSubmit} />}
      </Formik>
    </View>
  );
};

const AddReview = () => {
  const [addReview] = useAddReview();
  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text } = values;
    try {
      await addReview({
        ownerName,
        repositoryName,
        rating: Number(rating),
        text
      });
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <AddReviewPage onSubmit={onSubmit} />
  );
};

export default AddReview;