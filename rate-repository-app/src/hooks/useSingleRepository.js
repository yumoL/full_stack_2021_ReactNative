import { useQuery } from '@apollo/client';

import { GET_SINGLE_REPOSITORY } from '../graphql/queries';

const useSingleRepository = ({id: id}) => {
  const { data, error, loading } = useQuery(GET_SINGLE_REPOSITORY, {
    fetchPolicy: 'cache-and-network',
    variables: { id: id },
    // Other options
  });
  return { repository: data ? data.repository : undefined, loading, error };
};

export default useSingleRepository;