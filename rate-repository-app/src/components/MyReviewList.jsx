import React from "react";
import { FlatList, View } from 'react-native';
import useAuthUser from "../hooks/useAuthUser";
import { ReviewItem } from "./SingleRepository";
import Divider from "./Divider";
import Text from "./Text";


const MyReviewList = () => {
  const { authUser, fetchMore } = useAuthUser({ includeReviews: true, first: 3 });
  const reviews = authUser ? authUser.reviews.edges.map(edge => edge.node) : [];

  const onEndReached = () => {
    fetchMore();
  };

  if (reviews.length == 0) {
    return <View>
      <Text>You do not have any reviews</Text>
    </View>;
  }

  return (
    <View>
      <FlatList
        data={reviews}
        renderItem={({ item }) =>
          <ReviewItem
            review={item}
            isMyReview={true} 
          />}
        keyExtractor={({ id }) => id}
        ItemSeparatorComponent={() => <Divider />}
        ListFooterComponent={<View style={{ height: 20 }} />}
        contentContainerStyle={{ paddingBottom: 10 }}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

export default MyReviewList;