import { useApolloClient, useMutation } from "@apollo/client";
import { useHistory } from 'react-router-dom';
import { ADD_REVIEW } from "../graphql/mutations";

const useAddReview = () => {
  const [mutate, result] = useMutation(ADD_REVIEW);
  const apolloClient = useApolloClient();
  const history = useHistory();

  const addReview = async({repositoryName, ownerName, rating, text}) => {
    try {
      const { data } = await mutate({
        variables: {repositoryName, ownerName, rating, text}
      });
      const repositoryId = data.createReview.repositoryId;
      apolloClient.resetStore();
      history.push(`/repo/${repositoryId}`);

    } catch(e) {
      console.error(e);
    }
  };
  return [addReview, result];
};

export default useAddReview;

