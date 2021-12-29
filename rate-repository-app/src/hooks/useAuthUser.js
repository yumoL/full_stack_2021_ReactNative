import { useQuery } from "@apollo/client";
import { GET_AUTH_USER } from "../graphql/queries";

//variables={includeReviews, first, after}
const useAuthUser = (variables) => {
  const { data, error, loading, fetchMore, refetch } = useQuery(GET_AUTH_USER, {
      fetchPolicy: 'cache-and-network',
      variables
    });

  const handleFetchMore = () => {
    const canFetchMore = data?.authorizedUser.reviews.pageInfo.hasNextPage;
    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.authorizedUser.reviews.pageInfo.endCursor,
        ...variables
      }
    });
  };

  
  return { 
    authUser: data ? data.authorizedUser : undefined, 
    fetchMore: handleFetchMore,
    refetch,
    loading, 
    error };

};

export default useAuthUser;
