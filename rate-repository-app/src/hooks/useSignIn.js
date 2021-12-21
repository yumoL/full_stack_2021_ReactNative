import { useMutation } from "@apollo/client";

import { AUTHORIZE } from "../graphql/mutations";


const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHORIZE);

  const signIn = async ({ username, password }) => {
    // call the mutate function here with the right arguments
    try {
      const { data } = await mutate({ variables: { username: username, password: password } });
      //console.log(data.authorize.accessToken);
      return { data: data.authorize.accessToken };
    } catch (e) {
      console.error(e);
    }

  };

  return [signIn, result];
};

export default useSignIn;