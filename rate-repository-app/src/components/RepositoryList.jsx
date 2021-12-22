import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});


const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories }) => {

  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  const renderItem = ({ item }) => {
    return (
      <RepositoryItem
        id={item.id}
        fullName={item.fullName}
        description={item.description}
        language={item.language}
        stargazersCount={item.stargazersCount}
        forksCount={item.forksCount}
        reviewCount={item.reviewCount}
        ratingAverage={item.ratingAverage}
        ownerAvatarUrl={item.ownerAvatarUrl}
      />
    );
  };

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderItem}
      keyExtractor={item => item.fullName}
    // other props
    />
  );
};

const RepositoryList = () => {
  const { repositories, loading } = useRepositories();
  if (loading) return null;
  return <RepositoryListContainer repositories={repositories} />;
};

export default RepositoryList;