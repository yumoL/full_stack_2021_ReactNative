import React, { useState } from 'react';
import { FlatList, View, Picker } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { useDebounce } from 'use-debounce';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import Divider from './Divider';

export class RepositoryListContainer extends React.Component {

  repositories = this.props.repositories;

  repositoryNodes = this.repositories
    ? this.repositories.edges.map(edge => edge.node)
    : [];

  renderHeader = () => {
    return (
      <View style={{ backgroundColor: '#F8F9F9' }}>
        <Searchbar
          placeholder='Searck by keyword...'
          onChangeText={(text) => this.props.setSearchKeyword(text)}
          value={this.props.searchKeyword} />
        <Picker
          selectedValue={this.props.criteria}
          onValueChange={(itemValue) => this.props.setCriteria(itemValue)}
        >
          <Picker.Item label="Latest repositories" value="CREATED_AT,DESC" />
          <Picker.Item label="Highest rated epositories" value="RATING_AVERAGE,DESC" />
          <Picker.Item label="Lowest rated epositories" value="RATING_AVERAGE,ASC" />
        </Picker>
      </View>
    );
  };

  renderItem = ({ item }) => {
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
  render() {
    return (
      <FlatList
        data={this.repositoryNodes}
        ItemSeparatorComponent={() => <Divider />}
        renderItem={this.renderItem}
        keyExtractor={item => item.fullName}
        ListHeaderComponent={this.renderHeader}
        onEndReached={this.props.onEndReached}
        onEndReachedThreshold={0.5}
      // other props
      />
    );
  }
}

const RepositoryList = () => {
  const [criteria, setCriteria] = useState('CREATED_AT,DESC');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [debouncedKeyword] = useDebounce(searchKeyword, 500);

  const { repositories, loading, fetchMore } = useRepositories(
    {
      orderBy: criteria.split(',')[0],
      orderDirection: criteria.split(',')[1],
      searchKeyword: debouncedKeyword,
      first: 5
    });
  
  const onEndReached = () => {
    fetchMore();
  };

  if (loading) return null;

  return (
    <View>
      <RepositoryListContainer 
        repositories={repositories}
        criteria={criteria} 
        setCriteria={setCriteria} 
        searchKeyword={searchKeyword} 
        setSearchKeyword={setSearchKeyword} 
        onEndReached={onEndReached}
      />
    </View>
  );
};

export default RepositoryList;