import { useApolloClient, useMutation } from "@apollo/client";
import { useHistory } from 'react-router-dom';
import { AUTHORIZE } from "../graphql/mutations";
import useAuthStorage from '../hooks/useAuthStorage';


const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHORIZE);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const history = useHistory();

  const signIn = async ({ username, password }) => {
    // call the mutate function here with the right arguments
    try {
      const { data } = await mutate({ variables: { username: username, password: password } });
      const token = data.authorize.accessToken;
      await authStorage.setAccessToken(token);
      //console.log('storage', await authStorage.getAccessToken());
      apolloClient.resetStore();
      history.push('/');
      return { data: token };
    } catch (e) {
      console.error(e);
    }

  };

  return [signIn, result];
};

export default useSignIn;