import { useQuery } from "@apollo/client";
import { GET_AUTH_USER } from "../graphql/queries";

const useAuthUser = () => {
  const { data, error, loading } = useQuery(GET_AUTH_USER, {
      fetchPolicy: 'cache-and-network'
    });

  return { authUser: data ? data.authorizedUser : undefined, loading, error };

};

export default useAuthUser;
