import { useQuery } from '@apollo/client';

import { GET_SINGLE_REPOSITORY } from '../graphql/queries';

//variables={id, first, after}
const useSingleRepository = (variables) => {
  const { data, error, loading, fetchMore } = useQuery(GET_SINGLE_REPOSITORY, {
    fetchPolicy: 'cache-and-network',
    variables
    // Other options
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables
      }
    });
  };
  return {
    repository: data ? data.repository : undefined,
    fetchMore: handleFetchMore,
    loading,
    error
  };
};

export default useSingleRepository;