import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Link } from "react-router-native";
import Constants from 'expo-constants';
import theme from './Theme';
import Text from './Text'

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingBottom: Constants.statusBarHeight,
    backgroundColor: theme.colors.bar
  },
  text: {
    color: theme.colors.barText,
    fontSize: theme.fontSizes.barText,
    marginLeft: 18
  },
  barContainer: {
    flexDirection: 'row',
    flexGrow: 1,
  },
  // ...
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.barContainer}>

        <Link to="/">
          <Text style={styles.text}>Repositories</Text>
        </Link>
        <Link to="/signin">
          <Text style={styles.text}>Sign in</Text>
        </Link>
      </ScrollView>

    </View>
  );
};

export default AppBar;