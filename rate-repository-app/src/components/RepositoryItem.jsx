import React from 'react';
import { View } from 'react-native';
import Card from './Card';

const RepositoryItem = ({ fullName, description, language, stargazersCount, forksCount, reviewCount, ratingAverage, ownerAvatarUrl }) => {
  return (
    <View>
      <Card fullName={fullName}
        description={description} language={language} ownerAvatarUrl={ownerAvatarUrl}
        stargazersCount={stargazersCount} forksCount={forksCount} 
        reviewCount={reviewCount} ratingAverage={ratingAverage}
      />
    </View>
  );
};

export default RepositoryItem;
