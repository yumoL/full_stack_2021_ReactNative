import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Route, Switch, Redirect } from 'react-router-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import SignIn from './SignIn';
import SingleRepository from './SingleRepository';
import AddReview from './AddReview';
import SignUp from './SignUp';
import MyReviewList from './MyReviewList';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Switch>
        <Route path="/" exact>
          <RepositoryList />
        </Route>
        <Route path="/signin" exact>
          <SignIn />
        </Route>
        <Route path="/signup" exact>
          <SignUp />
        </Route>
        <Route path="/repo/:id" exact>
          <SingleRepository />
        </Route>
        <Route path="/review" exact>
          <AddReview />
        </Route>
        <Route path="/myreview" exact>
          <MyReviewList />
        </Route>
        <Redirect to="/" />
      </Switch>
    </View>
  );
};

export default Main;