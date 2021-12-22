import React from 'react';
import { View, Pressable, Button, Linking } from 'react-native';
import { useHistory } from "react-router-dom";
import Card from './Card';
import Divider from './Divider';

const RepositoryItem = ({ id, fullName, description, language, stargazersCount, forksCount, reviewCount, ratingAverage, ownerAvatarUrl, url }) => {
  const history = useHistory();

  const onPress = () => {
    history.push(`/repo/${id}`);
  };

  const onClickGithubButton = (url) => {
    Linking.openURL(url);
  };

  if (!url) {
    return (
      <View>
        <Pressable onPress={onPress}>
          <View>
            <Card fullName={fullName}
              description={description} language={language} ownerAvatarUrl={ownerAvatarUrl}
              stargazersCount={stargazersCount} forksCount={forksCount}
              reviewCount={reviewCount} ratingAverage={ratingAverage}
            />
          </View>
        </Pressable>
        <Divider />
      </View>

    );
  }
  return (
    <View  style={{ marginBottom: 15 }}>
      <Card fullName={fullName}
        description={description} language={language} ownerAvatarUrl={ownerAvatarUrl}
        stargazersCount={stargazersCount} forksCount={forksCount}
        reviewCount={reviewCount} ratingAverage={ratingAverage}
      />
      <Button
        title="Open in Github"
        onPress={() => onClickGithubButton(url)} />
    </View>
  );
};

export default RepositoryItem;
