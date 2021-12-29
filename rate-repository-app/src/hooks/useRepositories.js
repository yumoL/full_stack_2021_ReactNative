import { useQuery } from '@apollo/client';

import { GET_REPOSITORIES } from '../graphql/queries';

//variables={orderBy, orderDirection, searchKeyword}
const useRepositories = (variables) => {
  const { data, error, loading, fetchMore } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables
    // Other options
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return { 
    repositories: data ? data.repositories : undefined, 
    fetchMore: handleFetchMore,
    loading, 
    error 
  };
};

export default useRepositories;