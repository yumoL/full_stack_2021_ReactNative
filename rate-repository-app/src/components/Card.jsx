import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import theme from './Theme';

import Text from './Text';

const cardHeaderStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexGrow: 1,
    marginTop: 12,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 45 / 2,
  },
  avatarContainer: {
    flexGrow: 0,
    paddingRight: 15,
  },
  infoContainer: {
    flexGrow: 1,
  },
  tagContainer: {
    backgroundColor: theme.colors.fieldColor,
    padding: 10,
    marginTop: 15,
    fontSize: theme.fontSizes.body,
    alignSelf: 'flex-start',
    borderRadius: 10
  }
});

const CardHeader = ({ fullName, description, language, ownerAvatarUrl }) => {
  return (
    <View style={cardHeaderStyles.container}>
      <View style={cardHeaderStyles.avatarContainer}>
        <Image style={cardHeaderStyles.avatar} source={{ uri: ownerAvatarUrl }} />
      </View>
      <View style={cardHeaderStyles.infoContainer}>
        <Text fontWeight="bold" fontSize="subheading" testID="fullName">{fullName}</Text>
        <Text color="secondary" testID="description">{description}</Text>
        <View style={cardHeaderStyles.tagContainer}>
          <Text color="bar" testID="language">{language}</Text>
        </View>
      </View>
    </View>
  );
};

const numberInfoStyles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flexGrow: 1,
    marginTop: 10,
    alignItems: 'center'
  }
});

const NumberInfo = ({ fieldName, value }) => {
  return (
    <View>
      <View style={numberInfoStyles.container}>
        <Text fontWeight="bold" testID={`${fieldName}Value`}>{value}</Text>
        <Text color="secondary">{fieldName}</Text>
      </View>
    </View>
  );
};

const cardFooterStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexGrow: 1,
    justifyContent: 'space-around',
    marginTop: 12,
  },
});


const CardFooter = ({ stargazersCount, forksCount, reviewCount, ratingAverage }) => {
  const convertToKSuffix = (value) => {
    var num = Number(value);
    if (num >= 1000) {
      num = num / 1000;
      num = num.toFixed(1);
      return `${num}k`;
    }
    return value;
  };

  return (
    <View style={cardFooterStyles.container}>
      <NumberInfo fieldName="Stars" value={convertToKSuffix(stargazersCount)}/>
      <NumberInfo fieldName="Forks" value={convertToKSuffix(forksCount)} />
      <NumberInfo fieldName="Reviews" value={convertToKSuffix(reviewCount)} />
      <NumberInfo fieldName="Rating" value={convertToKSuffix(ratingAverage)} />
    </View>
  );
};

const cardStyles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    marginBottom: 10
  }
});

const dividerStyles = StyleSheet.create({
  container: {
    height: 10,
    backgroundColor: 'gray'
  }
});

const Card = ({ fullName, description, language, ownerAvatarUrl, stargazersCount, forksCount, reviewCount, ratingAverage }) => {
  return (
    <View>
      <View style={cardStyles.container}>
      <CardHeader fullName={fullName} description={description} language={language} ownerAvatarUrl={ownerAvatarUrl} />
      <CardFooter stargazersCount={stargazersCount} forksCount={forksCount} reviewCount={reviewCount} ratingAverage={ratingAverage} />
      </View>
      <View style={dividerStyles.container}>
      </View>
    </View>
    
  );
};

export default Card;