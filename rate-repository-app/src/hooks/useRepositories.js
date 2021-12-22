import { useQuery } from '@apollo/client';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    // Other options
  });

  //console.log("all loading", loading);

  return { repositories: data ? data.repositories : undefined, loading, error };
};

export default useRepositories;