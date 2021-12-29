import { useMutation } from "@apollo/client";
import { DELETE_REVIEW } from "../graphql/mutations";

const useDeleteReview = () => {
  const [mutate, result] = useMutation(DELETE_REVIEW);

  const deleteReview = async({id}) => {
    try {
      await mutate({
        variables: {id}
      });
    } catch(e){
      console.error(e);
    }
  };
  return {
    deleteReview: deleteReview,
    result: result
  };
};

export default useDeleteReview;
