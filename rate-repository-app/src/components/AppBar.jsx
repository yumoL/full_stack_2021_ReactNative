import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Link } from "react-router-native";
import Constants from 'expo-constants';
import theme from './Theme';
import Text from './Text';
import useAuthUser from '../hooks/useAuthUser';
import useSignOut from '../hooks/useSignOut';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingBottom: Constants.statusBarHeight,
    backgroundColor: theme.colors.bar
  },
  text: {
    color: theme.colors.barText,
    fontSize: theme.fontSizes.barText,
    marginLeft: 15
  },
  barContainer: {
    flexDirection: 'row',
    flexGrow: 1,
  },
  // ...
});

const AppBar = () => {
  const { authUser } = useAuthUser({ includeReviews: false });
  const [signOut] = useSignOut();

  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.barContainer}>
        <Link to="/">
          <Text style={styles.text}>Repositories</Text>
        </Link>
        {authUser ?
          <>
            <Link to="/" onPress={signOut}>
              <Text style={styles.text}>Sign out</Text>
            </Link>
            <Link to="/review">
              <Text style={styles.text}>Create a review</Text>
            </Link>
            <Link to="/myreview">
              <Text style={styles.text}>My reviews</Text>
            </Link>
            <Text style={styles.text}>{authUser.username}</Text>
          </>
          :
          <>
            <Link to="/signin">
              <Text style={styles.text}>Sign in</Text>
            </Link>
            <Link to="/signup">
              <Text style={styles.text}>Sign up</Text>
            </Link>
          </>


        }
      </ScrollView>

    </View>
  );
};

export default AppBar;