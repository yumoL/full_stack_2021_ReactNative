import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../graphql/mutations";



const useSignUp = () => {
  const [mutate, result] = useMutation(CREATE_USER);

  const signUp = async ({ username, password }) => {
    // call the mutate function here with the right arguments
    try {
      const { data } = await mutate({ variables: { username: username, password: password } });
      return { data: data ? data.createUser : undefined };
    } catch (e) {
      console.error(e);
    }

  };

  return [signUp, result];
};

export default useSignUp;